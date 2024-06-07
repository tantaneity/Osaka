import { WishlistItem } from "../models/common/shopping/WishlistItem";
import { IWishlistItemRepository } from "../repositories/IWishlistItemRepository";


export class WishlistItemService {
    constructor(private readonly wishlistItemRepository: IWishlistItemRepository) {}

    async getWishlistItemsByUserId(userId: string): Promise<WishlistItem[]> {
        return await this.wishlistItemRepository.getWishlistItemsByUserId(userId);
    }

    async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
        return await this.wishlistItemRepository.addToWishlist(userId, productId);
    }

    async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
        return await this.wishlistItemRepository.removeFromWishlist(userId, productId);
    }
}
