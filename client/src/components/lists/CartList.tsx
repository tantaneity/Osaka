import React, { useEffect, useState } from 'react';
import { useDeleteCartItem, useGetCartItemsByCartId, useUpdateCartItem } from '@/hooks/useCart';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Avatar, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Typography, Button } from '@material-tailwind/react';
import { convertToBase64 } from '@/lib/utils';
import { isProduct } from '@/types/shop/cart/CartItem';

interface CartListProps {
    cartId: string; 
}

const CartList: React.FC<CartListProps> = ({ cartId }) => { 
    const { data: cartItems, isLoading, refetch } = useGetCartItemsByCartId(cartId);
    const updateItem = useUpdateCartItem();
    const deleteItem = useDeleteCartItem();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (isUpdating) {
            refetch();
            setIsUpdating(false);
        }
    }, [isUpdating, refetch]);

    const handleIncrease = async (itemId: string) => {
        const updatedItem = cartItems?.find(item => item.id === itemId);
        if (updatedItem) {
            await updateItem.mutateAsync({
                cartItemId: itemId,
                cartItemData: {
                    quantity: updatedItem.quantity + 1
                }
            });
            setIsUpdating(true);
        }
    };

    const handleDecrease = async (itemId: string) => {
        const updatedItem = cartItems?.find(item => item.id === itemId);
        if (updatedItem && updatedItem.quantity > 1) {
            await updateItem.mutateAsync({
                cartItemId: itemId,
                cartItemData: {
                    quantity: updatedItem.quantity - 1
                }
            });
            setIsUpdating(true);
        }
    };

    const handleRemove = async (itemId: string) => {
        await deleteItem.mutateAsync(itemId);
        setIsUpdating(true);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="mb-2 flex items-center justify-between p-4">
            <List>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((cartItem) => (
                        <ListItem ripple={false} className="w-max h-max" key={cartItem.id}>
                            {isProduct(cartItem.product) && (
                                <ListItemPrefix>
                                    <Avatar 
                                        variant='rounded'
                                        alt={cartItem.product.name}
                                        src={convertToBase64(cartItem.product.images[0]?.data.data)}
                                        className="w-24 h-24"
                                    />
                                </ListItemPrefix>
                            )}
                            <div className="flex-grow">
                                <Typography variant="h6" className="mb-1">
                                    {isProduct(cartItem.product) ? cartItem.product.name : 'Unknown Product'}
                                </Typography>
                                <div className="flex items-center">
                                    <IconButton variant="text" color="blue-gray" onClick={() => handleDecrease(cartItem.id)}>
                                        <MinusIcon className="w-5 h-5" />
                                    </IconButton>
                                    <Typography variant="h6" className="mx-2">{cartItem.quantity}</Typography>
                                    <IconButton variant="text" color="blue-gray" onClick={() => handleIncrease(cartItem.id)}>
                                        <PlusIcon className="w-5 h-5" />
                                    </IconButton>
                                </div>
                            </div>
                            <ListItemSuffix>
                                <IconButton variant="text" color="red" onClick={() => handleRemove(cartItem.id)}>
                                    <TrashIcon className="w-5 h-5" />
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="h6" className="text-center mt-4">Nothing here</Typography>
                )}
            </List>
        </div>
    );
};

export default CartList;
