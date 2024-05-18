import Order from "../models/common/shopping/orders/Order";
import OrderStatus from "../models/common/shopping/orders/OrderStatus";


export interface IOrderRepository {
    getOrderById(orderId: string): Promise<Order | null>;
    createOrder(orderData: Order): Promise<Order>;
    updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order | null>;
    deleteOrder(orderId: string): Promise<boolean>;
    getAllOrders(): Promise<Order[]>;

    getOrderStatusById(statusId: number): Promise<OrderStatus | null>;
    createOrderStatus(statusData: OrderStatus): Promise<OrderStatus>;
    updateOrderStatus(statusId: number, statusData: Partial<OrderStatus>): Promise<OrderStatus | null>;
    deleteOrderStatus(statusId: number): Promise<boolean>;
    getAllOrderStatuses(): Promise<OrderStatus[]>;
}
