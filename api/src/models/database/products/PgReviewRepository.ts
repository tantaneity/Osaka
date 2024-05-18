import { Repository } from "typeorm"
import { AppDataSource } from "../../../config/data-source"
import { ApiError } from "../../../errors/api/ApiError"
import { IReviewRepository } from "../../../repositories/IReviewRepository"
import Review from "../../common/products/Review"
import { ReviewCreateDto, ReviewUpdateDto } from "../../dtos/product/ReviewDto"
import { ReviewEntity } from "../../entities/ReviewEntity"
import { ReviewMapper } from "../../mappers/ReviewMapper"
import { ProductEntity } from "../../entities/ProductEntity"
import { UserEntity } from "../../entities/UserEntity"

export class PgReviewRepository implements IReviewRepository {
    
    private readonly reviewRepository: Repository<ReviewEntity>

    constructor() {
        this.reviewRepository = AppDataSource.getRepository(ReviewEntity)
    }

    async getReviewById(reviewId: string): Promise<Review | null> {
        const review = await this.reviewRepository.findOne(
            {
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            }
        )
        return review ? ReviewMapper.ReviewToReviewEntity(review) : null
    }

    async createReview(reviewData: ReviewCreateDto): Promise<Review> {
        const productRepository = AppDataSource.getRepository(ProductEntity)
        const userRepository = AppDataSource.getRepository(UserEntity)
    
        const product = await productRepository.findOne({where: {id: reviewData.productId}})
        const user = await userRepository.findOne({where: {
            id: reviewData.userId
        }})
    
        if (!product) {
            throw new Error('Product not found')
        }
    
        if (!user) {
            throw new Error('User not found')
        }
        const newReview = new ReviewEntity()
        newReview.product = product
        newReview.user = user
        newReview.rating = reviewData.rating
        newReview.comment = reviewData.comment
        const savedReview = await this.reviewRepository.save(newReview)
    
        return ReviewMapper.ReviewToReviewEntity(savedReview)
    }

    async updateReview(reviewId: string, reviewData: ReviewUpdateDto): Promise<Review | null> {
        try {
            const review = await this.reviewRepository.findOne({
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            })
            if (!review) throw ApiError.notFound('Review not found')

            Object.assign(review, reviewData)
            await this.reviewRepository.save(review)
            return ReviewMapper.ReviewToReviewEntity(review)
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to update review', error)
        }
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        try {
            const review = await this.reviewRepository.findOne({
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            })
            if (!review) throw ApiError.notFound('Review not found')

            await this.reviewRepository.remove(review)
            return true
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to delete review', error)
        }
    }

    async getReviewsByProduct(productId: string): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({ where: { 
            product: {
                id: productId
            }
         }, relations: ['product', 'user'] })
        return reviews.map(review => ReviewMapper.ReviewToReviewEntity(review))
    }

    async getReviewsByUser(userId: string): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({
            where: {
                user: {
                    id: userId
                }
            }, relations: ['product', 'user']
        })
        
        return reviews.map(review => ReviewMapper.ReviewToReviewEntity(review))
    }
}