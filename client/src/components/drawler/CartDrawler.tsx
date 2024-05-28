import React from 'react';
import { Drawer, Typography } from "@material-tailwind/react";
import useUserStore from '@/store/UserStore';
import { useCreateCart, useGetCartItemsByCartId, useGetCartsByUserId } from '@/hooks/useCart';
import { Cart } from '@/types/shop/cart/Cart';
import CartList from '../lists/CartList';

interface CartDrawlerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawler: React.FC<CartDrawlerProps> = ({ open, onClose }) => {
    const { user } = useUserStore();
    const { data: cartData, error: cartError, isLoading: cartLoading } = useGetCartsByUserId(user?.id);
    const cartId = cartData && cartData.length > 0 ? cartData[0].id : null;
    
    return (
        <Drawer 
            open={open} 
            onClose={onClose} 
            className="p-4 drop-shadow-2xl"
            placement="left"
            size={500}
            overlay={false}
        >
            <div className="mb-6 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className='max-w-md mx-auto p-4'>
                    Shopping Cart
                </Typography>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="flex justify-center">
                {cartId && <CartList cartId={cartId}/>}
            </div>
        </Drawer>
    );
};

export default CartDrawler;
