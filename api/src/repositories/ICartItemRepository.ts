import CartItem from "../models/common/shopping/cart/CartItem";


export interface ICartItemRepository {
    getCartItemById(cartItemId: string): Promise<CartItem | null>;
    createCartItem(cartItemData: CartItem): Promise<CartItem>;
    updateCartItem(cartItemId: string, cartItemData: Partial<CartItem>): Promise<CartItem | null>;
    deleteCartItem(cartItemId: string): Promise<boolean>;
    getAllCartItems(): Promise<CartItem[]>;
    getCartItemsByCartId(cartId: string): Promise<CartItem[]>;
}