import React from 'react';
import { Badge, Button } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useGetCartItemsByCartId, useGetCartsByUserId } from '@/hooks/useCart';
import useUserStore from '@/store/UserStore';

interface CartButtonProps {
    onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const { user } = useUserStore();
    const { data: cartData } = useGetCartsByUserId(user?.id);
    const cartId = cartData && cartData.length > 0 ? cartData[0].id : null;
    const { data: cartItems } = useGetCartItemsByCartId(cartId);
    const totalQuantity = cartItems?.reduce((total, item) => total + item.quantity, 0)
    return (
        <div className="fixed bottom-6 right-6">
            <Badge content={totalQuantity} invisible={cartItems?.length == 0 ? true : false}>
                <Button
                    color="black"
                    size="lg"
                    onClick={onClick}
                    className="flex items-center justify-center p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
                >
                    <ShoppingCartIcon className="h-6 w-6" />
                </Button>
            </Badge>
            
        </div>
    );
};

export default CartButton;
