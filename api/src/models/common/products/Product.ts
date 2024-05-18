import Category from "./Category"
import Review from "./Review"
import Image from "./Image"

export default interface Product {
    id: string
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