import User from "../../users/User"
import CartItem  from "./CartItem"

export default interface Cart {
    id: string
    items: CartItem[]
    user: User
    dateCreated: Date
    dateModified: Date
}