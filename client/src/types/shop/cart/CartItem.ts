import { Product } from "@/types/products/Product"
import { Cart } from "./Cart"

export interface CartItem {
    id: string
    cart: Cart
    product: Product
    quantity: number
}