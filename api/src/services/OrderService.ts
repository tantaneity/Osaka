import { IOrderRepository } from '../repositories/IOrderRepository';
import Order from '../models/common/shopping/orders/Order';
import OrderStatus from '../models/common/shopping/orders/OrderStatus';
import { ApiError } from '../errors/api/ApiError';

export class OrderService {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async getOrderById(orderId: string): Promise<Order | null> {
        return await this.orderRepository.getOrderById(orderId);
    }

    async createOrder(orderData: Order): Promise<Order> {
        return await this.orderRepository.createOrder(orderData);
    }

    async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order | null> {
        return await this.orderRepository.updateOrder(orderId, orderData);
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        return await this.orderRepository.deleteOrder(orderId);
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAllOrders();
    }

    async getOrderStatusById(statusId: number): Promise<OrderStatus | null> {
        return await this.orderRepository.getOrderStatusById(statusId);
    }

    async createOrderStatus(statusData: OrderStatus): Promise<OrderStatus> {
        return await this.orderRepository.createOrderStatus(statusData);
    }

    async updateOrderStatus(statusId: number, statusData: Partial<OrderStatus>): Promise<OrderStatus | null> {
        return await this.orderRepository.updateOrderStatus(statusId, statusData);
    }

    async deleteOrderStatus(statusId: number): Promise<boolean> {
        return await this.orderRepository.deleteOrderStatus(statusId);
    }

    async getAllOrderStatuses(): Promise<OrderStatus[]> {
        return await this.orderRepository.getAllOrderStatuses();
    }
}
