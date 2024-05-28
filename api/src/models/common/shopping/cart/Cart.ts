import { UserShortInfoDto } from "../../../dtos/user/UserDto"
import User from "../../users/User"
import CartItem  from "./CartItem"

export default interface Cart {
    id: string
    items: CartItem[]
    user: UserShortInfoDto | {id: string}
    dateCreated: Date
    dateModified: Date
}