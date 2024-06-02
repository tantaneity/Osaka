import React from 'react';
import { Badge, Button } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import useCartStore from '@/store/CartStore';

interface CartButtonProps {
    onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const { cart } = useCartStore();
    const totalQuantity = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
    return (
        <div className="fixed bottom-6 right-6">
            <Badge content={totalQuantity} invisible={totalQuantity === 0}>
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
