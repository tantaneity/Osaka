import { Product } from "./Product"

export interface Image {
    id: string
    product: Product
    data: Buffer
    createdAt: Date
}