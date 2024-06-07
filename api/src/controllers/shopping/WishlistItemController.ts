import { Request, Response, NextFunction } from 'express';
import { WishlistItemService } from '../../services/WishlistItemService';
import { ApiError } from '../../errors/api/ApiError';

export class WishlistItemController {
    constructor(private readonly wishlistItemService: WishlistItemService) {}

    async getWishlistItemsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const wishlistItems = await this.wishlistItemService.getWishlistItemsByUserId(userId);
            res.json(wishlistItems);
        } catch (error) {
            next(error);
        }
    }

    async addToWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const productId = req.body.productId;
            const wishlistItem = await this.wishlistItemService.addToWishlist(userId, productId);
            res.json(wishlistItem);
        } catch (error) {
            next(error);
        }
    }

    async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const productId = req.body.productId;
            const result = await this.wishlistItemService.removeFromWishlist(userId, productId);
            if (result) {
                res.json({ success: true });
            } else {
                throw ApiError.notFound('Item not found in wishlist');
            }
        } catch (error) {
            next(error);
        }
    }
}