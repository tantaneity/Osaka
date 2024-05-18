import { ICartItemRepository } from '../repositories/ICartItemRepository';
import CartItem from '../models/common/shopping/cart/CartItem';

export class CartItemService {
    constructor(private readonly cartItemRepository: ICartItemRepository) {}

    async getCartItemById(cartItemId: string): Promise<CartItem | null> {
        return this.cartItemRepository.getCartItemById(cartItemId);
    }

    async createCartItem(cartItemData: CartItem): Promise<CartItem> {
        return this.cartItemRepository.createCartItem(cartItemData);
    }

    async updateCartItem(cartItemId: string, cartItemData: Partial<CartItem>): Promise<CartItem | null> {
        return this.cartItemRepository.updateCartItem(cartItemId, cartItemData);
    }

    async deleteCartItem(cartItemId: string): Promise<boolean> {
        return this.cartItemRepository.deleteCartItem(cartItemId);
    }

    async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
        return this.cartItemRepository.getCartItemsByCartId(cartId);
    }

    async getAllCartItems(): Promise<CartItem[]> {
        return this.cartItemRepository.getAllCartItems();
    }
}
