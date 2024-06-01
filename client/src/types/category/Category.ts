export interface Category {
    id: number
    name: string
    image: {
        type: string
        data: ArrayBuffer
    }
    description: string
    parentCategory?: Category
}