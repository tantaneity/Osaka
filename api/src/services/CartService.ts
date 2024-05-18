import { ICartRepository } from '../repositories/ICartRepository';
import Cart from '../models/common/shopping/cart/Cart';

export class CartService {
    constructor(private readonly cartRepository: ICartRepository) {}

    async getCartById(cartId: string): Promise<Cart | null> {
        return this.cartRepository.getCartById(cartId);
    }

    async createCart(cartData: Cart): Promise<Cart> {
        return this.cartRepository.createCart(cartData);
    }

    async updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart | null> {
        return this.cartRepository.updateCart(cartId, cartData);
    }

    async deleteCart(cartId: string): Promise<boolean> {
        return this.cartRepository.deleteCart(cartId);
    }

    async getAllCarts(): Promise<Cart[]> {
        return this.cartRepository.getAllCarts();
    }

    async getCartsByUserId(userId: string): Promise<Cart[]> {
        return this.cartRepository.getCartsByUserId(userId);
    }
}
