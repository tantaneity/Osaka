import Product from "../../products/Product"
import Order from "./Order"

export default interface OrderItem {
    id: string
    product: Product | {id: string}
    order: Order | {id: string}
    price: number
    quantity: number
}