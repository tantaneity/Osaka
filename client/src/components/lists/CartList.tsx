import React from 'react';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Avatar, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Spinner, Typography} from '@material-tailwind/react';
import { convertToBase64 } from '@/lib/utils';
import { CartItem, isProduct } from '@/types/shop/cart/CartItem';
import CartIsEmptyLayer from '../layer/CartIsEmptyLayer';
import useCartStore from '@/store/CartStore';
import { useGetProductById } from '@/hooks/useProducts';

const CartList: React.FC = () => {
    const { cart, addItem, removeItem, decreaseItem, loadCart } = useCartStore();
    
    const handleIncrease = (productId: string) => {
        addItem({ id: productId }, 1);
    };

    const handleDecrease = (productId: string) => {
        const currentItem = cart?.items.find(item => item.product.id === productId);
        if (currentItem && currentItem.quantity > 1) {
            decreaseItem(productId)
        }
    };

    const handleRemove = (productId: string) => {
        removeItem(productId);
    };

    return (
        <div className="mb-2 flex items-center justify-between p-4">
            <List>
                {cart?.items && cart.items.length > 0 ? (
                    cart.items.map((cartItem: CartItem) => (
                        <ListItem ripple={false} className="w-full" key={cartItem.id}>
                            <CartItemDetail cartItem={cartItem} handleDecrease={handleDecrease} handleIncrease={handleIncrease} handleRemove={handleRemove} />
                        </ListItem>
                    ))
                ) : (
                    <CartIsEmptyLayer />
                )}
            </List>
        </div>
    );
};

interface CartItemDetailProps {
    cartItem: CartItem;
    handleDecrease: (productId: string) => void;
    handleIncrease: (productId: string) => void;
    handleRemove: (productId: string) => void;
}

const CartItemDetail: React.FC<CartItemDetailProps> = ({ cartItem, handleDecrease, handleIncrease, handleRemove }) => {
    const { data: productData, isLoading } = useGetProductById(cartItem.product.id);

    if (isLoading || !productData) {
        return (
            <Spinner />
        );
    }

    return (
        <>
            {isProduct(productData) && (
                <>
                    <ListItemPrefix>
                        <a href={`../drinks/${productData.id}`}>
                            <Avatar 
                                variant='rounded'
                                alt={productData.name}
                                src={convertToBase64(productData.images[0]?.data.data)}
                                className="w-24 h-24 object-cover"
                            />
                        </a>
                    </ListItemPrefix>
                    <div className="flex-grow">
                        <Typography variant="h6" className="mb-1">
                            {productData.name}
                        </Typography>
                        <div className="flex items-center">
                            <IconButton variant="text" color="blue-gray" onClick={() => handleDecrease(cartItem.product.id)}>
                                <MinusIcon className="w-5 h-5" />
                            </IconButton>
                            <Typography variant="h6" className="mx-2">{cartItem.quantity}</Typography>
                            <IconButton variant="text" color="blue-gray" onClick={() => handleIncrease(cartItem.product.id)}>
                                <PlusIcon className="w-5 h-5" />
                            </IconButton>
                        </div>
                    </div>
                    <ListItemSuffix>
                        <IconButton variant="text" color="red" onClick={() => handleRemove(cartItem.product.id)}>
                            <TrashIcon className="w-5 h-5" />
                        </IconButton>
                    </ListItemSuffix>
                </>
            )}
        </>
    );
};

export default CartList;
