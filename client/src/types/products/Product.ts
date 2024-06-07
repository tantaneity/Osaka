import { Category } from "../category/Category"
import { Image } from "./Image"
import Review from "../review/Review"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    categories: Category[]
    quantity: number
    images: Image[]
    reviews: Review[]
    dateAdded: Date
    dateModified: Date
}