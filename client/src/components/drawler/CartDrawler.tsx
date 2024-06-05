import React from 'react';
import { Drawer, Typography, Button } from "@material-tailwind/react";
import CartList from '../lists/CartList';
import useCartStore from '@/store/CartStore';
import { useNavigate } from 'react-router';

interface CartDrawlerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawler: React.FC<CartDrawlerProps> = ({ open, onClose }) => {
    const { cart } = useCartStore(); 
    const totalQuantity = cart?.items.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate()

    const handleBuy = () => {
        navigate('/shopping_cart/checkout')
    }
    
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
                    
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex justify-center bg-blue-gray-50 rounded-lg">
                    <CartList />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button
                    color="black"
                    size="lg"
                    className="w-full"
                    onClick={handleBuy}
                    disabled={!totalQuantity}
                >
                    Buy Now
                </Button>
            </div>
        </Drawer>
    );
};

export default CartDrawler;
