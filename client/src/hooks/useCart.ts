import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CartService from '@/services/CartService';
import { Cart } from '@/types/shop/cart/Cart';
import { CartItem } from '@/types/shop/cart/CartItem';


export const useGetAllCarts = () => useQuery({
    queryKey: ['carts'],
    queryFn: () => CartService.getAllCarts(),
});

export const useGetCartById = (cartId: string | undefined | null) => useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => CartService.getCartById(cartId || ''),
    enabled: !!cartId,
});

export const useGetCartsByUserId = (userId: string | undefined | null) => useQuery({
    queryKey: ['cart-by-user', userId],
    queryFn: () => CartService.getCartsByUserId(userId || ''),
    enabled: !!userId,
});
export const useCreateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-cart'],
        mutationFn: (cartData: Partial<Cart>) => CartService.createCart(cartData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    });
};

export const useUpdateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-cart'],
        mutationFn: ({ cartId, cartData }: { cartId: string, cartData: Partial<Cart> }) => CartService.updateCart(cartId, cartData),
        onSuccess: (_, { cartId }) => {
            queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
        }
    });
};

export const useDeleteCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-cart'],
        mutationFn: (cartId: string) => CartService.deleteCart(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    });
};

export const useGetAllCartItems = () => useQuery({
    queryKey: ['cart-items'],
    queryFn: () => CartService.getAllCartItems(),
});

export const useGetCartItemById = (cartItemId: string | undefined | null) => useQuery({
    queryKey: ['cart-item', cartItemId],
    queryFn: () => CartService.getCartItemById(cartItemId || ''),
    enabled: !!cartItemId,
});


export const useGetCartItemsByCartId = (cartId: string | undefined | null) => useQuery({
    queryKey: ['cart-items', cartId],
    queryFn: () => CartService.getCartItemsByCartId(cartId || ''),
    enabled: !!cartId,
});

export const useCreateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-cart-item'],
        mutationFn: (cartItemData: Partial<CartItem>) => CartService.createCartItem(cartItemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart-items'] });
        }
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-cart-item'],
        mutationFn: ({ cartItemId, cartItemData }: { cartItemId: string, cartItemData: Partial<CartItem> }) => CartService.updateCartItem(cartItemId, cartItemData),
        onSuccess: (_, { cartItemId }) => {
            queryClient.invalidateQueries({ queryKey: ['cart-item', cartItemId] });
        }
    });
};

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-cart-item'],
        mutationFn: (cartItemId: string) => CartService.deleteCartItem(cartItemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart-items'] });
        }
    });
};