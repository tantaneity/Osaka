import { Category } from "../category/Category"


export interface ProductUpdate {
    name?: string
    description?: string
    price?: number
    categories?: Category[]
    quantity?: number
}