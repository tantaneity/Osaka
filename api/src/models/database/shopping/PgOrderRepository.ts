import { Repository } from 'typeorm';
import { OrderEntity } from '../../entities/OrderEntity';
import Order from '../../common/shopping/orders/Order';
import { ApiError } from '../../../errors/api/ApiError';
import { AppDataSource } from '../../../config/data-source';
import { IOrderRepository } from '../../../repositories/IOrderRepository';
import { OrderMapper } from '../../mappers/OrderMapper';
import OrderStatus from '../../common/shopping/orders/OrderStatus';
import { OrderStatusEntity } from '../../entities/OrderStatusEntity';

export class PgOrderRepository implements IOrderRepository {
    private readonly orderRepository: Repository<OrderEntity>;
    private readonly orderStatusRepository: Repository<OrderStatusEntity>;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(OrderEntity);
        this.orderStatusRepository = AppDataSource.getRepository(OrderStatusEntity);
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        const order = await this.orderRepository.findOne({where: {id: orderId}});
        return order ? OrderMapper.fromOrderEntityToOrder(order) : null;
    }

    async createOrder(orderData: Order): Promise<Order> {
        const {user, orderStatus, orderApprovedAt, orderDeliveredCarrierDate, orderDeliveredUserDate, createdAt, orderItems} = orderData;
        const newOrder = this.orderRepository.create({
            user: {
                id: user.id
            },
            orderStatus: {
                id: orderStatus.id
            },
            orderApprovedAt: orderApprovedAt,
            orderDeliveredCarrierDate: orderDeliveredCarrierDate,
            orderDeliveredUserDate: orderDeliveredUserDate,
            createdAt: createdAt
        });
        const savedOrder = await this.orderRepository.save(newOrder);
        return OrderMapper.fromOrderEntityToOrder(savedOrder);
    }

    async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order | null> {
        let order = await this.orderRepository.findOne({ where: {id: orderId}});
        if (!order) {
            throw ApiError.notFound('Order not found');
        }
        Object.assign(order, orderData)
        await this.orderRepository.save(order);
        return OrderMapper.fromOrderEntityToOrder(order);
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        const result = await this.orderRepository.delete(orderId);
        return result.affected !== 0;
    }

    async getAllOrders(): Promise<Order[]> {
        const orders = await this.orderRepository.find();
        return orders.map(order => OrderMapper.fromOrderEntityToOrder(order));
    }

    async getOrderStatusById(statusId: number): Promise<OrderStatus | null> {
        const status = await this.orderStatusRepository.findOne({where: {id: statusId}});
        return status ? OrderMapper.fromOrderStatusEntityToOrderStatus(status) : null;
    }

    async createOrderStatus(statusData: OrderStatus): Promise<OrderStatus> {
        const newStatus = this.orderStatusRepository.create(statusData);
        const savedStatus = await this.orderStatusRepository.save(newStatus);
        return OrderMapper.fromOrderStatusEntityToOrderStatus(savedStatus);
    }

    async updateOrderStatus(statusId: number, statusData: Partial<OrderStatus>): Promise<OrderStatus | null> {
        let status = await this.orderStatusRepository.findOne({where:{id: statusId}});
        if (!status) {
            throw ApiError.notFound('Order status not found');
        }
        Object.assign(status, statusData);
        await this.orderStatusRepository.save(status);
        return OrderMapper.fromOrderStatusEntityToOrderStatus(status);
    }

    async deleteOrderStatus(statusId: number): Promise<boolean> {
        const result = await this.orderStatusRepository.delete(statusId);
        return result.affected !== 0;
    }

    async getAllOrderStatuses(): Promise<OrderStatus[]> {
        const statuses = await this.orderStatusRepository.find();
        return statuses.map(status => OrderMapper.fromOrderStatusEntityToOrderStatus(status));
    }
}

