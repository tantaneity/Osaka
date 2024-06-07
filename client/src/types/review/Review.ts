import { Product } from "../products/Product"
import { UserShort } from "../users/UserShort"

export default interface Review {
    id: string
    user: UserShort
    product: Product
    rating: number
    comment: string
    parentReview?: Review | null
    replies?: Review[]
    datePosted: Date
}