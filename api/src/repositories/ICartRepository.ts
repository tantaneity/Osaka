import Cart from "../models/common/shopping/cart/Cart";


export interface ICartRepository {
    getCartById(cartId: string): Promise<Cart | null>;
    createCart(cartData: Cart): Promise<Cart>;
    updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart | null>;
    deleteCart(cartId: string): Promise<boolean>;
    getAllCarts(): Promise<Cart[]>;
    getCartsByUserId(userId: string): Promise<Cart[]>;
}