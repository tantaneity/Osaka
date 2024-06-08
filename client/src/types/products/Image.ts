import { Product } from "./Product"

export interface Image {
    id: string
    product: Product
    data?: {
        type: string
        data: ArrayBuffer
    }
    base64Url: string
    createdAt: Date
}
export interface ImageCreate {
    product: {id: string}
    data?: {
        type: string
        data: ArrayBuffer
    }
    base64Url: string
}
export interface ImageUpdate {
    product: {id: string}
    data?: ArrayBuffer
    base64Url?: string
}