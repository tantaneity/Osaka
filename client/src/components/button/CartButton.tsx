import React from 'react';
import { Button } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

interface CartButtonProps {
    onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    return (
        <div className="fixed bottom-6 right-6">
            <Button
                color="black"
                size="lg"
                onClick={onClick}
                className="flex items-center justify-center p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
            >
                <ShoppingCartIcon className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default CartButton;
