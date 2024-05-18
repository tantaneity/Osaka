import Product from "../../products/Product"
import Cart from "./Cart"

export default interface CartItem {
    id: string
    cart: Cart
    product: Product
    quantity: number
}