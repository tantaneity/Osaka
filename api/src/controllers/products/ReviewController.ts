import { NextFunction, Request, Response } from 'express'
import { ReviewService } from '../../services/ReviewService'
import { ApiError } from '../../errors/api/ApiError'
import { ReviewCreateDto, ReviewUpdateDto } from '../../models/dtos/product/ReviewDto'

export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string

            const review = await this.reviewService.getReviewById(reviewId)
            if (!review) {
                return next(ApiError.notFound('Review not found'))
            }
            res.json(review)
        } catch (error) {
            next(error)
        }
    }

    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewData: ReviewCreateDto = req.body

            const review = await this.reviewService.createReview(reviewData)
            res.json(review)
        } catch (error) {
            next(error)
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string
            const reviewData: ReviewUpdateDto = req.body
            const updatedReview = await this.reviewService.updateReview(reviewId, reviewData)
            if (!updatedReview) {
                return next(ApiError.notFound('Review not found'))
            }
            res.json(updatedReview)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string
            const result = await this.reviewService.deleteReview(reviewId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getReviewsByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string
            const reviews = await this.reviewService.getReviewsByProduct(productId)
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
    
    async fetchAdditionalReviewsByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string
            const skip = parseInt(req.query.skip as string) || 0;
            const take = parseInt(req.query.take as string) || 20;
            const reviews = await this.reviewService.fetchAdditionalReviewsByProduct(productId, skip, take);
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
    
    async getReviewsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const reviews = await this.reviewService.getReviewsByUser(userId)
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
}
