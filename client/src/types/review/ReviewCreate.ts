export interface ReviewCreate {
    userId: string
    productId: string
    rating: number
    comment: string
    parentReviewId?: string
}
