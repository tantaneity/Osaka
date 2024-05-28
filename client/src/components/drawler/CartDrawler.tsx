import React from 'react';
import { Drawer, Typography } from "@material-tailwind/react";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
    return (
        <Drawer open={open} onClose={onClose} className="fixed right-0 top-0 w-full max-w-sm h-full bg-white shadow-lg">
            <div className="mb-2 flex items-center justify-between p-4 border-b">
                <Typography variant="h5" color="blue-gray">
                    Shopping Cart
                </Typography>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/*TODO: cart content here */}
            <div className="p-4">
                <Typography>This is your cart. Add items here.</Typography>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
