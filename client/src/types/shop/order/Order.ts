import { OrderItem } from "./OrderItem"
import { OrderStatus } from "./OrderStatus"


export interface Order {
    id: string
    user: {id: string}
    orderStatus: OrderStatus
    orderApprovedAt: Date
    orderDeliveredCarrierDate: Date
    orderDeliveredUserDate: Date
    createdAt: Date
    orderItems: OrderItem[]
}
