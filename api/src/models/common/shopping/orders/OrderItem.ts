import Product from "../../products/Product"
import Order from "./Order"

export default interface OrderItem {
    id: string
    product: Product
    order: Order
    price: number
    quantity: number
}