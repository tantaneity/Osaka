import { Category } from "../category/Category"

export interface ProductCreate {
    name: string
    description: string
    price: number
    categories?: Category[] | ({id: string})[]
    quantity: number
}