import { api } from "@/api";
import { Order } from "@/types/shop/order/Order";
import { OrderItem } from "@/types/shop/order/OrderItem";
import { OrderStatus } from "@/types/shop/order/OrderStatus";

class OrderService {
    private ROUTE_PREFIX = 'api/orders';

    async getOrderById(orderId: string): Promise<Order | null> {
        const order = (await api.get<Order>(`${this.ROUTE_PREFIX}/${orderId}`)).data;
        return order;
    }

    async getOrdersByUserId(userId: string): Promise<Order[]> {
        const orders = (await api.get<Order[]>(`${this.ROUTE_PREFIX}/user/${userId}`)).data;
        return orders;
    }
    async createOrder(orderData: Order): Promise<Order> {
        const order = (await api.post<Order>(this.ROUTE_PREFIX, orderData)).data;
        return order;
    }

    async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order | null> {
        const order = (await api.put<Order>(`${this.ROUTE_PREFIX}/${orderId}`, orderData)).data;
        return order;
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        await api.delete(`${this.ROUTE_PREFIX}/${orderId}`);
        return true;
    }

    async getAllOrders(): Promise<Order[]> {
        const orders = (await api.get<Order[]>(`${this.ROUTE_PREFIX}`)).data;
        return orders;
    }

    async getOrderStatusById(statusId: number): Promise<OrderStatus | null> {
        const status = (await api.get<OrderStatus>(`${this.ROUTE_PREFIX}/statuses/${statusId}`)).data;
        return status;
    }

    async createOrderStatus(statusData: OrderStatus): Promise<OrderStatus> {
        const status = (await api.post<OrderStatus>(`${this.ROUTE_PREFIX}/statuses`, statusData)).data;
        return status;
    }

    async updateOrderStatus(statusId: number, statusData: Partial<OrderStatus>): Promise<OrderStatus | null> {
        const status = (await api.put<OrderStatus>(`${this.ROUTE_PREFIX}/statuses/${statusId}`, statusData)).data;
        return status;
    }

    async deleteOrderStatus(statusId: number): Promise<boolean> {
        await api.delete(`${this.ROUTE_PREFIX}/statuses/${statusId}`);
        return true;
    }

    async getAllOrderStatuses(): Promise<OrderStatus[]> {
        const statuses = (await api.get<OrderStatus[]>(`${this.ROUTE_PREFIX}/statuses`)).data;
        return statuses;
    }

    async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
        const orderItems = (await api.get<OrderItem[]>(`${this.ROUTE_PREFIX}/${orderId}/items`)).data;
        return orderItems;
    }

    async getOrderItemById(orderItemId: string): Promise<OrderItem | null> {
        const orderItem = (await api.get<OrderItem>(`${this.ROUTE_PREFIX}/items/${orderItemId}`)).data;
        return orderItem;
    }

    async createOrderItem(orderItemId: string, orderItemData: Partial<OrderItem>): Promise<OrderItem> {
        const orderItem = (await api.post<OrderItem>(`${this.ROUTE_PREFIX}/${orderItemId}/items`, orderItemData)).data;
        return orderItem;
    }

    async updateOrderItem(orderItemId: string, orderItemData: Partial<OrderItem>): Promise<OrderItem | null> {
        const orderItem = (await api.put<OrderItem>(`${this.ROUTE_PREFIX}/items/${orderItemId}`, orderItemData)).data;
        return orderItem;
    }

    async deleteOrderItem(orderItemId: string): Promise<boolean> {
        await api.delete(`${this.ROUTE_PREFIX}/items/${orderItemId}`);
        return true;
    }
}

export default new OrderService();
