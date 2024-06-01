import { Router } from 'express';
import { WishlistItemService } from '../services/WishlistItemService';
import { PgWishlistItemRepository } from '../models/database/shopping/PgWishlistItemRepository';
import { WishlistItemController } from '../controllers/shopping/WishlistItemController';

const wishlistItemRepository = new PgWishlistItemRepository();
const wishlistItemService = new WishlistItemService(wishlistItemRepository);
const wishlistItemController = new WishlistItemController(wishlistItemService);

const WishlistItemRouter = Router();

WishlistItemRouter.get('/:userId', async (req, res, next) => {
    await wishlistItemController.getWishlistItemsByUserId(req, res, next);
});

WishlistItemRouter.post('/:userId', async (req, res, next) => {
    await wishlistItemController.addToWishlist(req, res, next);
});

WishlistItemRouter.delete('/:userId', async (req, res, next) => {
    await wishlistItemController.removeFromWishlist(req, res, next);
});

export default WishlistItemRouter;
