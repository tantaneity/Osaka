import OrderItem from "../models/common/shopping/orders/OrderItem";


export interface IOrderItemRepository {
    getOrderItemById(itemId: string): Promise<OrderItem | null>;
    createOrderItem(itemData: OrderItem): Promise<OrderItem>;
    updateOrderItem(itemId: string, itemData: Partial<OrderItem>): Promise<OrderItem | null>;
    deleteOrderItem(itemId: string): Promise<boolean>;
    getAllOrderItems(): Promise<OrderItem[]>;
}
