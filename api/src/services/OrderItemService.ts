import { IOrderItemRepository } from '../repositories/IOrderItemRepository';
import OrderItem from '../models/common/shopping/orders/OrderItem';
import { ApiError } from '../errors/api/ApiError';

export class OrderItemService {
    constructor(private readonly orderItemRepository: IOrderItemRepository) {}

    async getOrderItemById(orderItemId: string): Promise<OrderItem | null> {
        return await this.orderItemRepository.getOrderItemById(orderItemId);
    }

    async createOrderItem(orderItemData: OrderItem): Promise<OrderItem> {
        return await this.orderItemRepository.createOrderItem(orderItemData);
    }

    async updateOrderItem(orderItemId: string, orderItemData: Partial<OrderItem>): Promise<OrderItem | null> {
        return await this.orderItemRepository.updateOrderItem(orderItemId, orderItemData);
    }

    async deleteOrderItem(orderItemId: string): Promise<boolean> {
        return await this.orderItemRepository.deleteOrderItem(orderItemId);
    }

    async getAllOrderItems(): Promise<OrderItem[]> {
        return await this.orderItemRepository.getAllOrderItems();
    }
}
