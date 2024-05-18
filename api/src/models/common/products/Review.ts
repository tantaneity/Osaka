import { UserInfoDto } from "../../dtos/user/UserDto"
import User from "../users/User"
import Product from "./Product"


export default interface Review {
    id: string
    user: User | UserInfoDto
    product: Product
    rating: number
    comment: string
    parentReview?: Review | null
    replies?: Review[]
    datePosted: Date
}