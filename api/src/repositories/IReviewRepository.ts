import Review from "../models/common/products/Review"
import { ReviewCreateDto, ReviewUpdateDto } from "../models/dtos/product/ReviewDto"

export interface IReviewRepository {
    getReviewById(reviewId: string): Promise<Review | null>
    createReview(reviewData: ReviewCreateDto): Promise<Review>
    updateReview(reviewId: string, reviewData: ReviewUpdateDto): Promise<Review | null>
    deleteReview(reviewId: string): Promise<boolean>
    getReviewsByProduct(productId: string): Promise<Review[]>
    getReviewsByUser(userId: string): Promise<Review[]>
}
