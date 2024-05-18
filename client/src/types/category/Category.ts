export interface Category {
    id: number
    name: string
    description: string
    parentCategory?: Category
}