import Product from "./Product"

export default interface Image {
    id: string
    product: Product | {id: string}
    data?: Buffer
    base64Url: string
    createdAt: Date
}
