export interface Category {
    id: number
    name: string
    image?: {
        type: string
        data: ArrayBuffer
    }
    base64Url?: string,
    description: string
    parentCategory?: Category | {id: string}
}