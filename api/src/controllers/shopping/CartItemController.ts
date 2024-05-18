import { NextFunction, Request, Response } from 'express';
import { CartItemService } from '../../services/CartItemService';
import CartItem from '../../models/common/shopping/cart/CartItem';
import { ApiError } from '../../errors/api/ApiError';

export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}

    async getCartItemById(req: Request, res: Response, next: NextFunction) {
        try {
            const cartItemId = req.params.id as string;
            const cartItem = await this.cartItemService.getCartItemById(cartItemId);
            if (!cartItem) {
                return next(ApiError.notFound('CartItem not found'));
            }
            res.json(cartItem);
        } catch (error) {
            next(error);
        }
    }

    async createCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const cartItemData: CartItem = req.body;
            const cartItem = await this.cartItemService.createCartItem(cartItemData);
            res.json(cartItem);
        } catch (error) {
            next(error);
        }
    }

    async updateCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const cartItemId = req.params.id as string;
            const cartItemData: Partial<CartItem> = req.body;
            const updatedCartItem = await this.cartItemService.updateCartItem(cartItemId, cartItemData);
            if (!updatedCartItem) {
                return next(ApiError.notFound('CartItem not found'));
            }
            res.json(updatedCartItem);
        } catch (error) {
            next(error);
        }
    }

    async deleteCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const cartItemId = req.params.id as string;
            const result = await this.cartItemService.deleteCartItem(cartItemId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllCartItems(req: Request, res: Response, next: NextFunction) {
        try {
            const cartItems = await this.cartItemService.getAllCartItems();
            res.json(cartItems);
        } catch (error) {
            next(error);
        }
    }

    async getCartItemsByCartId(req: Request, res: Response, next: NextFunction) {
        try {
            const cartId = req.params.cartId as string;
            const cartItems = await this.cartItemService.getCartItemsByCartId(cartId);
            res.json(cartItems);
        } catch (error) {
            next(error);
        }
    }
}
