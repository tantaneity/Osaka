export default interface Category {
    id: number
    name: string
    image?: Buffer
    description: string
    parentCategory?: Category
}
