export default interface Category {
    id: number
    name: string
    image?: Buffer
    base64Url?: string,
    description: string
    parentCategory?: Category
}
