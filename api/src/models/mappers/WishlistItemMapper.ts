import { WishlistItem } from '../common/shopping/WishlistItem';
import { WishlistItemEntity } from '../entities/WishlistItemEntity';

export class WishlistItemMapper {
    static fromWishlistItemEntityToWishlistItem(wishlistItemEntity: WishlistItemEntity): WishlistItem {
        return {
            id: wishlistItemEntity.id,
            userId: wishlistItemEntity.user.id,
            productId: wishlistItemEntity.product.id,
        };
    }
}
