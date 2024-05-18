import { Router, Request, Response, NextFunction } from 'express';
import { CartItemController } from '../controllers/shopping/CartItemController';
import { CartItemService } from '../services/CartItemService';
import { CartController } from '../controllers/shopping/CartController';
import { CartService } from '../services/CartService';
import { PgCartItemRepository } from '../models/database/shopping/PgCartItemRepository';
import { PgCartRepository } from '../models/database/shopping/PgCartRepository';

const cartItemRepository = new PgCartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);
const cartItemController = new CartItemController(cartItemService);

const cartRepository = new PgCartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

const CartRouter = Router();

CartRouter.get('/items', async (req: Request, res: Response, next: NextFunction) => {
    await cartItemController.getAllCartItems(req, res, next);
});

CartRouter.get('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartItemController.getCartItemById(req, res, next);
});

CartRouter.post('/items', async (req: Request, res: Response, next: NextFunction) => {
    await cartItemController.createCartItem(req, res, next);
});

CartRouter.put('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartItemController.updateCartItem(req, res, next);
});

CartRouter.delete('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartItemController.deleteCartItem(req, res, next);
});

CartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.getAllCarts(req, res, next);
});

CartRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.getCartById(req, res, next);
});

CartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.createCart(req, res, next);
});

CartRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.updateCart(req, res, next);
});

CartRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.deleteCart(req, res, next);
});

export default CartRouter;
