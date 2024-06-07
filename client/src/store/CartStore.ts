import { create } from "zustand";
import { Product } from "@/types/products/Product";
import CartService from "@/services/CartService";
import { LocalCart } from "@/types/shop/cart/LocalCart";
import { getCartFromLocalStorage, saveCartToLocalStorage, clearCartFromLocalStorage } from "@/utils/cartUtils";
import useUserStore from "./UserStore";
import { isProduct } from "@/types/shop/cart/CartItem";

interface CartState {
    cart: LocalCart | null;
    addItem: (product: Product | { id: string; }, quantity: number) => void;
    decreaseItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    loadCart: () => void;
    getTotalPrice: (product: Product[]) => number;
}

const generateCartId = (): string => `cart_${new Date().getTime()}`;

const useCartStore = create<CartState>((set, get) => ({
    cart: getCartFromLocalStorage(),

    addItem: async (product, quantity) => {
        const { user, isAuth, cart } = useUserStore.getState();
        set((state) => {
            let cart = state.cart;

            if (!cart) {
                cart = {
                    id: generateCartId(),
                    items: [],
                    dateCreated: new Date(),
                    dateModified: new Date(),
                };
            }

            const existingItem = cart.items.find((item) => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                console.log(product)
                if (isProduct(product)){
                    cart.items.push({
                        id: `item_${new Date().getTime()}`,
                        product: product,
                        quantity
                    });
                }
                
            }

            cart.dateModified = new Date();
            if (!isAuth) {
                saveCartToLocalStorage(cart);
            }

            return { cart };
        });

        if (isAuth && user && cart) {
            
            const cartItemData = {
                product: {id: product.id},
                quantity,
                cart: {id: cart.id}
            };
            
            await CartService.createCartItem(cartItemData);
        }
    },

    removeItem: async (productId) => {
        const { user, isAuth, cart } = useUserStore.getState();

        set((state) => {
            if (!state.cart) return { cart: null };

            const updatedItems = state.cart.items.filter((item) => item.product.id !== productId);

            const updatedCart = {
                ...state.cart,
                items: updatedItems,
                dateModified: new Date(),
            };

            if (!isAuth) {
                saveCartToLocalStorage(updatedCart);
            }

            return { cart: updatedCart };
        });

        if (isAuth && user) {
            const cartItem = (await CartService.getCartItemsByCartId(cart?.id || "")).find((item) => item.product.id === productId);
            if (cartItem) {
                await CartService.deleteCartItem(cartItem.id);
            }
        }
    },
    decreaseItem: async (productId) => {
        const { user, isAuth, cart } = useUserStore.getState();
        
        set((state) => {
            if (!state.cart) return { cart: null };

            const updatedItems = [...state.cart.items];
            const itemIndex = updatedItems.findIndex((item) => item.product.id === productId);
            if (itemIndex !== -1) {
                updatedItems[itemIndex].quantity -= 1;
                if (updatedItems[itemIndex].quantity <= 0) {
                    updatedItems.splice(itemIndex, 1);
                }
            }

            const updatedCart = {
                ...state.cart,
                items: updatedItems,
                dateModified: new Date(),
            };

            if (!isAuth) {
                saveCartToLocalStorage(updatedCart);
            }

            return { cart: updatedCart };
        });

        if (isAuth && user) {
            const cartItem = (await CartService.getCartItemsByCartId(cart?.id || "")).find((item) => item.product.id === productId);
            if (cartItem) {
                await CartService.updateCartItem(cartItem.id, { quantity: -1 });
            }
        }
    },

    clearCart: () => {
        const { isAuth } = useUserStore.getState();

        clearCartFromLocalStorage();
        set({ cart: null });

        if (isAuth) {
            const cartId = get().cart?.id;
            if (cartId) {
                CartService.deleteCart(cartId);
            }
        }
    },

    loadCart: async () => {
        const { user, isAuth, cart } = useUserStore.getState();
        
        if (isAuth && user) {
            set({ cart: cart });
        } else {
            const localCart = getCartFromLocalStorage();
            set({ cart: localCart });
        }
    },
    getTotalPrice: (products: Product[]) => {
        const { cart } = get();
        if (!cart) return 0;
    
        return cart.items.reduce((total, item) => {
            const product = products.find(p => p.id === item.product.id);
            if (product && isProduct(product) && typeof product.price === 'number') {
                return total + item.quantity * product.price;
            }
            return total;
        }, 0);
    }
    
    
}));

export default useCartStore;
