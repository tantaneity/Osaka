import Category from "../../common/products/Category"
import Image from "../../common/products/Image"

export interface ProductCreateDto {
    name: string
    description: string
    price: number
    categories?: Category[]
    quantity: number
}

export interface ProductUpdateDto {
    name?: string
    description?: string
    price?: number
    categories?: Category[]
    quantity?: number
}
