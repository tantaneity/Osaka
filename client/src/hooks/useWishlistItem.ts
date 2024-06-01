import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import WishlistItemService from '@/services/WishlistItemService';

export const useGetWishlistItemsByUserId = (userId: string | undefined | null) => useQuery({
    queryKey: ['wishlist-items', userId],
    queryFn: () => WishlistItemService.getWishlistItemsByUserId(userId || ''),
    enabled: !!userId,
});

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['add-to-wishlist'],
        mutationFn: (data: { userId: string, productId: string }) => WishlistItemService.addToWishlist(data.userId, data.productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
        }
    });
};

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['remove-from-wishlist'],
        mutationFn: (data: { userId: string, productId: string }) => WishlistItemService.removeFromWishlist(data.userId, data.productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
        }
    });
};
