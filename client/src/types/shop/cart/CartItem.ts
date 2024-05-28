import { Product } from "@/types/products/Product"
import { Cart } from "./Cart"

export interface CartItem {
    id: string
    cart: Cart | {id: string}
    product: Product | {
        id : string
    }
    quantity: number
}

export function isProduct(product: Product | { id: string }): product is Product {
    return (product as Product).name !== undefined;
}