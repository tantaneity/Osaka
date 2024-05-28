import React from 'react';
import { Drawer, Typography, Button, Chip } from "@material-tailwind/react";
import useUserStore from '@/store/UserStore';
import { useGetCartItemsByCartId, useGetCartsByUserId } from '@/hooks/useCart';
import CartList from '../lists/CartList';
import { isProduct } from '@/types/shop/cart/CartItem';

interface CartDrawlerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawler: React.FC<CartDrawlerProps> = ({ open, onClose }) => {
    const { user } = useUserStore();
    const { data: cartData } = useGetCartsByUserId(user?.id);
    const cartId = cartData && cartData.length > 0 ? cartData[0].id : null;
    const { data: cartItems } = useGetCartItemsByCartId(cartId);
    const totalQuantity = cartItems?.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems?.reduce((total, item) => {
        if (isProduct(item.product)) {
            return total + item.quantity * item.product.price;
        }
        return total;
    }, 0).toFixed(2);

    return (
        <Drawer 
            open={open} 
            onClose={onClose} 
            className="p-4 drop-shadow-2xl flex flex-col justify-between rounded-lg"
            placement="left"
            size={500}
            overlay={false}
        >
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className='max-w-md bg-white mx-auto p-4'>
                        Shopping Cart
                    </Typography>
                    {!!totalQuantity && 
                    <Chip
                        value={`Total: $${totalPrice}`}
                        color="blue-gray"
                        size="lg"
                        variant="outlined"
                        className="mr-4"
                    />
                    }
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex justify-center bg-blue-gray-50 rounded-lg">
                    {cartId && <CartList cartId={cartId}/>}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                
                <Button
                    color="black"
                    size="lg"
                    className="w-full"
                    disabled={!totalQuantity}
                >
                    Buy Now
                </Button>
            </div>
        </Drawer>
    );
};

export default CartDrawler;
