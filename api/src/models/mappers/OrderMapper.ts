import Order from "../common/shopping/orders/Order";
import OrderItem from "../common/shopping/orders/OrderItem";
import OrderStatus from "../common/shopping/orders/OrderStatus";
import { OrderEntity } from "../entities/OrderEntity";
import { OrderItemEntity } from "../entities/OrderItemEntity";
import { OrderStatusEntity } from "../entities/OrderStatusEntity";
import { UserMapper } from "./UserMapper";


export class OrderMapper {
    static fromOrderEntityToOrder(orderEntity: OrderEntity): Order {
        return {
            id: orderEntity.id,
            user: { id: orderEntity.user.id },
            orderStatus: orderEntity.orderStatus,
            orderApprovedAt: orderEntity.orderApprovedAt,
            orderDeliveredCarrierDate: orderEntity.orderDeliveredCarrierDate,
            orderDeliveredUserDate: orderEntity.orderDeliveredUserDate,
            createdAt: orderEntity.createdAt,
            orderItems: orderEntity.orderItems ? orderEntity.orderItems.map(item => this.fromOrderItemEntityToOrderItem(item)) : [],
        };
    }    

    static fromOrderItemEntityToOrderItem(entity: OrderItemEntity): OrderItem {
        return {
            id: entity.id,
            product: {id: entity.product.id},
            order: {id: entity.order.id},
            price: entity.price,
            quantity: entity.quantity
        }
    }

    static fromOrderStatusEntityToOrderStatus(entity: OrderStatusEntity): OrderStatus {
        return {
            id: entity.id,
            status_name: entity.status_name,
            color: entity.color,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
    }
}