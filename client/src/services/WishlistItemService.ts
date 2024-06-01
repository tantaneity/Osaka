import { api } from '@/api';
import { WishlistItem } from '@/types/shop/wish/WishlistItem';

class WishlistItemService {
    private ROUTE_PREFIX = '/api/wishlist';

    async getWishlistItemsByUserId(userId: string): Promise<WishlistItem[]> {
        const wishlistItems = (await api.get<WishlistItem[]>(`${this.ROUTE_PREFIX}/${userId}`)).data;
        return wishlistItems;
    }

    async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
        const wishlistItem = (await api.post<WishlistItem>(`${this.ROUTE_PREFIX}/${userId}`, { productId })).data;
        return wishlistItem;
    }

    async removeFromWishlist(userId: string, productId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${userId}`, { data: { productId } });
    }
}

export default new WishlistItemService();
