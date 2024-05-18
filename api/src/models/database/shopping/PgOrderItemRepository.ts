import { Repository } from 'typeorm';
import OrderItem from '../../common/shopping/orders/OrderItem';
import { ApiError } from '../../../errors/api/ApiError';
import { AppDataSource } from '../../../config/data-source';
import { IOrderItemRepository } from '../../../repositories/IOrderItemRepository';
import { OrderMapper } from '../../mappers/OrderMapper';
import { OrderItemEntity } from '../../entities/OrderItemEntity';

export class PgOrderItemRepository implements IOrderItemRepository {
    private readonly orderItemRepository: Repository<OrderItemEntity>;

    constructor() {
        this.orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
    }

    async getOrderItemById(itemId: string): Promise<OrderItem | null> {
        const item = await this.orderItemRepository.findOne({where: {
            id: itemId
        }});
        return item ? OrderMapper.fromOrderItemEntityToOrderItem(item) : null;
    }

    async createOrderItem(itemData: OrderItem): Promise<OrderItem> {
        const {product, order, price , quantity} = itemData;
        const newItem = this.orderItemRepository.create({
            product: {
                id: product.id
            },
            order: {
                id: order.id,
            },
            price: price,
            quantity: quantity
        });
        const savedItem = await this.orderItemRepository.save(newItem);
        return OrderMapper.fromOrderItemEntityToOrderItem(savedItem);
    }

    async updateOrderItem(itemId: string, itemData: Partial<OrderItem>): Promise<OrderItem | null> {
        const existingItem = await this.orderItemRepository.findOne({where:{id: itemId}});
        if (!existingItem) {
            return null;
        }

        Object.assign(existingItem, itemData);
        const savedItemEntity = await this.orderItemRepository.save(existingItem);
        return OrderMapper.fromOrderItemEntityToOrderItem(savedItemEntity);
    }

    async deleteOrderItem(itemId: string): Promise<boolean> {
        const result = await this.orderItemRepository.delete(itemId);
        return result.affected !== 0;
    }

    async getAllOrderItems(): Promise<OrderItem[]> {
        const items = await this.orderItemRepository.find();
        return items.map(item => OrderMapper.fromOrderItemEntityToOrderItem(item));
    }
}
