import { Product } from "@/types/products/Product"
import { Order } from "./Order"

export interface OrderItem {
    id: string
    product: Product | {id: string}
    order: Order | {id: string}
    price: number
    quantity: number
}


export interface CreateOrderItem {
    product: Product | {id: string}
    order: Order | {id: string}
    price: number
    quantity: number
}