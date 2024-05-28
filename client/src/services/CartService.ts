import { api } from "@/api";
import { Cart } from "@/types/shop/cart/Cart";
import { CartItem } from "@/types/shop/cart/CartItem";


class CartService {
    private ROUTE_PREFIX = 'api/cart';

    async getCartById(cartId: string): Promise<Cart> {
        const cart = (await api.get<Cart>(`${this.ROUTE_PREFIX}/${cartId}`)).data;
        return cart;
    }

    async getAllCarts(): Promise<Cart[]> {
        const carts = (await api.get<Cart[]>(this.ROUTE_PREFIX)).data;
        return carts;
    }

    async createCart(cartData: Partial<Cart>): Promise<Cart> {
        const cart = (await api.post<Cart>(this.ROUTE_PREFIX, cartData)).data;
        return cart;
    }

    async updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart> {
        const cart = (await api.put<Cart>(`${this.ROUTE_PREFIX}/${cartId}`, cartData)).data;
        return cart;
    }

    async deleteCart(cartId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${cartId}`);
    }

    async getAllCartItems(): Promise<CartItem[]> {
        const cartItems = (await api.get<CartItem[]>(`${this.ROUTE_PREFIX}/items`)).data;
        return cartItems;
    }

    async getCartItemById(cartItemId: string): Promise<CartItem> {
        const cartItem = (await api.get<CartItem>(`${this.ROUTE_PREFIX}/items/${cartItemId}`)).data;
        return cartItem;
    }

    async createCartItem(cartItemData: Partial<CartItem>): Promise<CartItem> {
        const cartItem = (await api.post<CartItem>(`${this.ROUTE_PREFIX}/items`, cartItemData)).data;
        return cartItem;
    }

    async updateCartItem(cartItemId: string, cartItemData: Partial<CartItem>): Promise<CartItem> {
        const cartItem = (await api.put<CartItem>(`${this.ROUTE_PREFIX}/items/${cartItemId}`, cartItemData)).data;
        return cartItem;
    }

    async deleteCartItem(cartItemId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/items/${cartItemId}`);
    }
}

export default new CartService();
