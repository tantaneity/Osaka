import Product from "./Product"

export default interface Sells {
    id: string
    product: Product
    price: number
    quantity: number
    dateSold: Date
}