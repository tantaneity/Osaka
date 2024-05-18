import { Router, Request, Response, NextFunction } from 'express'
import { ReviewController } from '../controllers/products/ReviewController'
import { PgReviewRepository } from '../models/database/products/PgReviewRepository'
import { ReviewService } from '../services/ReviewService'

const reviewRepository = new PgReviewRepository()
const reviewService = new ReviewService(reviewRepository)
const reviewController = new ReviewController(reviewService)
const ReviewRouter = Router()

ReviewRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.getReviewById(req, res, next)
})

ReviewRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.createReview(req, res, next)
})

ReviewRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.updateReview(req, res, next)
})

ReviewRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.deleteReview(req, res, next)
})

ReviewRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.getReviewsByProduct(req, res, next)
})

ReviewRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    await reviewController.getReviewsByUser(req, res, next)
})

export default ReviewRouter
