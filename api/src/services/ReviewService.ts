import { IReviewRepository } from '../repositories/IReviewRepository'
import { ApiError } from '../errors/api/ApiError'
import Review from '../models/common/products/Review'
import { ReviewCreateDto, ReviewUpdateDto } from '../models/dtos/product/ReviewDto'


export class ReviewService {
    constructor(private readonly reviewRepository: IReviewRepository) {}

    async getReviewById(reviewId: string): Promise<Review | null> {
        const review = await this.reviewRepository.getReviewById(reviewId)
        if (!review) {
            throw ApiError.notFound("Review not found")
        }
        return review
    }

    async createReview(reviewData: ReviewCreateDto): Promise<Review> {
        return await this.reviewRepository.createReview(reviewData)
    }

    async updateReview(reviewId: string, reviewData: ReviewUpdateDto): Promise<Review | null> {
        const review = await this.reviewRepository.getReviewById(reviewId)
        if (!review) {
            throw ApiError.notFound("Review not found")
        }
        return await this.reviewRepository.updateReview(reviewId, reviewData)
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        const review = await this.reviewRepository.getReviewById(reviewId)
        if (!review) {
            throw ApiError.notFound("Review not found")
        }
        return await this.reviewRepository.deleteReview(reviewId)
    }

    async getReviewsByProduct(productId: string): Promise<Review[]> {
        return await this.reviewRepository.getReviewsByProduct(productId)
    }

    async getReviewsByUser(userId: string): Promise<Review[]> {
        return await this.reviewRepository.getReviewsByUser(userId)
    }
}
