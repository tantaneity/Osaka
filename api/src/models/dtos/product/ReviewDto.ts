import Review from "../../common/products/Review"

export interface ReviewCreateDto {
    userId: string
    productId: string
    rating: number
    comment: string
    parentReviewId?: string
}

export interface ReviewUpdateDto {
    rating?: number
    comment?: string
}
