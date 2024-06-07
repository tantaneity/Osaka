import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { WishlistGrid } from '@/components/grid/WishlistGrid';
import WishlistEmptyLayer from '@/components/layer/WishlistEmptyLayer';
import { useGetWishlistItemsByUserId, useRemoveFromWishlist } from '@/hooks/useWishlistItem';
import useUserStore from '@/store/UserStore';
import { Card, CardBody } from '@material-tailwind/react';

const WishlistPage: React.FC = () => {
    const { user } = useUserStore();
    const user_id = user?.id;
    const { data: wishlistItems } = useGetWishlistItemsByUserId(user_id);
    const removeFromWishlistMutation = useRemoveFromWishlist();

    const handleRemoveFromWishlist = (productId: string) => {
        removeFromWishlistMutation.mutate({ userId: user_id || '', productId });
    };

    return (
        <div className="p-6">
            <Transition
                as={Fragment}
                show={true}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Card className="bg-pink-50 rounded-3xl">
                    <CardBody>
                        {wishlistItems && wishlistItems.length > 0 ? (
                            <WishlistGrid items={wishlistItems} onRemove={handleRemoveFromWishlist} />
                        ) : (
                            <WishlistEmptyLayer />
                        )}
                    </CardBody>
                </Card>
            </Transition>
        </div>
    );
};

export default WishlistPage;
