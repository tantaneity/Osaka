import Product from "./Product"

export default interface Image {
    id: string
    product: Product
    data: Buffer
    createdAt: Date
}
