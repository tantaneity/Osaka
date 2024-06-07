import { Product } from "@/types/products/Product"

export interface Sells {
    id: string
    product: Product | {id: string}
    price: number
    quantity: number
    dateSold: Date
}