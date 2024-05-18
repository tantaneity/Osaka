import { NextFunction, Request, Response } from 'express';
import { CartService } from '../../services/CartService';
import Cart from '../../models/common/shopping/cart/Cart';
import { ApiError } from '../../errors/api/ApiError';

export class CartController {
    constructor(private readonly cartService: CartService) {}

    async getCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const cartId = req.params.id as string;
            const cart = await this.cartService.getCartById(cartId);
            if (!cart) {
                return next(ApiError.notFound('Cart not found'));
            }
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
            const cartData: Cart = req.body;
            const cart = await this.cartService.createCart(cartData);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req: Request, res: Response, next: NextFunction) {
        try {
            const cartId = req.params.id as string;
            const cartData: Partial<Cart> = req.body;
            const updatedCart = await this.cartService.updateCart(cartId, cartData);
            if (!updatedCart) {
                return next(ApiError.notFound('Cart not found'));
            }
            res.json(updatedCart);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req: Request, res: Response, next: NextFunction) {
        try {
            const cartId = req.params.id as string;
            const result = await this.cartService.deleteCart(cartId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllCarts(req: Request, res: Response, next: NextFunction) {
        try {
            const carts = await this.cartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            next(error);
        }
    }

    async getCartsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const carts = await this.cartService.getCartsByUserId(userId);
            res.json(carts);
        } catch (error) {
            next(error);
        }
    }
}
