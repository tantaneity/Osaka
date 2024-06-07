import { LocalCart } from "@/types/shop/cart/LocalCart";

const CART_KEY = 'user_cart';

export const saveCartToLocalStorage = (cart: LocalCart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const getCartFromLocalStorage = (): LocalCart | null => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : null;
};

export const clearCartFromLocalStorage = () => {
    localStorage.removeItem(CART_KEY);
};
