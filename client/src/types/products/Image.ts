import { Product } from "./Product"

export interface Image {
    id: string
    product: Product
    data: {
        type: string
        data: ArrayBuffer
    }
    createdAt: Date
}