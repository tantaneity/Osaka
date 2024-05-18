import { Category } from "../category/Category"
import { Image } from "./Image"
import Review from "../review/Review"

export interface Product {
    name: string
    description: string
    price: number
    categories: Category[]
    quantity: number
    images?: Image[] | null
    reviews: Review[]
    dateAdded: Date
    dateModified: Date
}