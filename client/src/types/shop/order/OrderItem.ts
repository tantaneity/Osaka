import { Product } from "@/types/products/Product"
import { Order } from "./Order"

export interface OrderItem {
    id: string
    product: Product
    order: Order
    price: number
    quantity: number
}