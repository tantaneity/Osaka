import Review from "../common/products/Review"
import { ReviewEntity } from "../entities/ReviewEntity"
import { ProductMapper } from "./ProductMapper"
import { UserMapper } from "./UserMapper"

export class ReviewMapper {

    static ReviewToReviewEntity(entity: ReviewEntity): Review {
        return {
            id: entity.id,
            user: UserMapper.fromUserEntityToUserInfoDto(entity.user),
            product: ProductMapper.fromProductEntityToProduct(entity.product),
            rating: entity.rating,
            comment: entity.comment,
            parentReview: entity.parentReview ? this.ReviewToReviewEntity(entity.parentReview) : null,
            replies: entity.replies ? entity.replies.map(ens => this.ReviewToReviewEntity(ens)) : [],
            datePosted: entity.datePosted
        }
    }

}