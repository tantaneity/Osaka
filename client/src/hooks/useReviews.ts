import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReviewService from '@/services/ReviewService';
import { ReviewCreate } from '@/types/review/ReviewCreate';

export const useGetReviewsByProductId = (productId: string | undefined | null) => useQuery({
    queryKey: ['reviews-by-product-id', productId],
    queryFn: () => ReviewService.getReviewsByProductId(productId || ''),
    enabled: !!productId,
});

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-review'],
        mutationFn: (reviewData: ReviewCreate) => ReviewService.createReview(reviewData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-review'],
        mutationFn: (reviewId: string) => ReviewService.deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};


export const useFetchAdditionalReviewsByProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['fetch-additional-reviews'],
        mutationFn: ({ productId, skip, take }: { productId: string, skip: number, take: number }) => ReviewService.fetchAdditionalReviewsByProduct(productId, skip, take),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};
