import { ReviewCreate } from "@/types/review/ReviewCreate";
import { api } from "@/api";
import Review from "@/types/review/Review";

class ReviewService {
    private ROUTE_PREFIX = 'api/reviews';

    async getReviewsByProductId(productId: string): Promise<Review[]> {
        const reviews = (await api.get<Review[]>(`${this.ROUTE_PREFIX}/product/${productId}`)).data;
        return reviews;
    }

    async createReview(reviewData: ReviewCreate): Promise<Review> {
        const review = (await api.post<Review>(this.ROUTE_PREFIX, reviewData)).data;
        return review;
    }

    async deleteReview(reviewId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${reviewId}`);
    }
}

export default new ReviewService();
