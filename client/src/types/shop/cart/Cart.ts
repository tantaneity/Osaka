import { UserShort } from "@/types/users/UserShort"
import { CartItem } from "./CartItem"

export interface Cart {
    id: string
    items: CartItem[]
    user?: UserShort | null
    dateCreated: Date
    dateModified: Date
}