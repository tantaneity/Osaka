import { UserShort } from "@/types/users/UserShort"
import { OrderItem } from "./OrderItem"
import { OrderStatus } from "./OrderStatus"


export interface Order {
    id: string
    user: {id: string}
    orderStatus: {id: number} | OrderStatus
    orderApprovedAt: Date
    orderDeliveredCarrierDate: Date
    orderDeliveredUserDate: Date
    createdAt: Date
    orderItems: OrderItem[]
}
export interface OrderCreate {
    user: {id: string}
    orderStatus: {id: number} | OrderStatus
}
