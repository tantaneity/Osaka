import User from "../../users/User"
import OrderItem from "./OrderItem"
import OrderStatus from "./OrderStatus"

export default interface Order {
    id: string
    user: User
    orderStatus: OrderStatus
    orderApprovedAt: Date
    orderDeliveredCarrierDate: Date
    orderDeliveredUserDate: Date
    createdAt: Date
    orderItems: OrderItem[]
}
