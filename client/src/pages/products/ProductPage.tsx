import React, { useEffect, useState } from 'react';
import { useGetProductById } from "@/hooks/useProducts";
import { useGetReviewsByProductId, useCreateReview } from "@/hooks/useReviews";
import { useParams } from "react-router-dom";
import {
    Card,
    Button,
    Carousel,
    IconButton,
    Rating,
    Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled} from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { convertToBase64 } from "@/lib/utils";
import { ProductPageSkeleton } from "@/components/skeleton/ProductPageSkeleton";
import ReviewFormDialog from '@/components/dialog/ReviewFormDialog';
import Review from '@/types/review/Review';
import { UserShort } from '@/types/users/UserShort';
import useUserStore from '@/store/UserStore';
import { ReviewDialog } from '@/components/dialog/ReviewDialog';
import { LoginDialog } from '@/components/dialog/LoginDialog';
import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';
import toast, { Toaster } from 'react-hot-toast';
import { useAddToWishlist, useGetWishlistItemsByUserId, useRemoveFromWishlist } from '@/hooks/useWishlistItem';
import useCartStore from '@/store/CartStore';

const ProductPage: React.FC = () => {
    const { productId = ""} = useParams<{ productId?: string }>();
    const { data: productData, error: productError, isLoading: productLoading } = useGetProductById(productId);
    const { data: reviewsData, error: reviewsError, isLoading: reviewsLoading } = useGetReviewsByProductId(productId);
    const createReviewMutation = useCreateReview();
    
    const { isAuth, user } = useUserStore();
    const [openReviewForm, setOpenReviewForm] = useState(false);
    const [openReviews, setOpenReviews] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const { cart, addItem, removeItem, clearCart, loadCart } = useCartStore();

    useEffect(() => {
        loadCart();
    }, [loadCart, isAuth, user]);

    const { mutate: addToWishlist } = useAddToWishlist();
    const { mutate: removeFromWishlist } = useRemoveFromWishlist();
    const { data: wishlistItems } = useGetWishlistItemsByUserId(user?.id);

    const [isInWishlist, setIsInWishlist] = useState(() => {
        if (!wishlistItems || !productData) return false;
        return wishlistItems.some(item => item.productId === productId);
    });

    const handleToggleWishlist = () => {
        if (!isAuth) {
            toast.error('Need to login!');
            return;
        }
        
        if (isInWishlist) {
            removeFromWishlist({ userId: user?.id || '', productId });
        } else {
            addToWishlist({ userId: user?.id || '', productId });
        }
        
        setIsInWishlist(prev => !prev); 
    };
    

    const handleAddToCart = () => {
        if (productData) {
            addItem({id: productData.id}, 1);
            console.log(cart)
            toast.success("Successfull")
        }
      };

    const handleCartButtonClick = () => {
        setDrawerOpen(true);
    };
    

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const handleOpenReviewForm = () => setOpenReviewForm(!openReviewForm);
    const handleOpenReviews = () => setOpenReviews(!openReviews);

    

    if (productLoading || reviewsLoading) {
        return <div><ProductPageSkeleton /></div>;
    }

    if (productError) {
        return <div>Error: {productError.message}</div>;
    }

    if (reviewsError) {
        return <div>Error: {reviewsError.message}</div>;
    }

    const calculateAverageRating = (reviews: Review[] | undefined) => {
        if (!reviews || reviews.length === 0) {
            return 5;
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating(reviewsData);

    const handleReviewSubmit = (review: { user: UserShort; rating: number; comment: string }) => {
        createReviewMutation.mutate({
            productId: productId || '',
            userId: user?.id || '',
            rating: review.rating,
            comment: review.comment,
        });
        handleOpenReviewForm();
    };

    return (
        <section className="py-8 px-4 sm:px-8">
            <Toaster/>
            <div className="mx-auto container grid place-items-center gap-8 grid-cols-1 lg:grid-cols-2 ">
                
                <CartDrawler open={drawerOpen} onClose={closeDrawer} />
                <Card className="w-full max-w-md lg:max-w-xl min-h-[32rem] flex flex-col justify-between" variant="gradient">
                    <Carousel
                        className="rounded-xl h-96 w-full relative flex-auto"
                        autoplay={true}
                        loop={true}
                        prevArrow={({ handlePrev }) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={handlePrev}
                                className="!absolute top-2/4 left-4 -translate-y-2/4"
                            >
                                <ArrowLeftCircleIcon color="black" className="h-6 w-6" />
                            </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={handleNext}
                                className="!absolute top-2/4 right-4 -translate-y-2/4"
                            >
                                <ArrowRightCircleIcon color="black" className="h-6 w-6" />
                            </IconButton>
                        )}
                    >
                        {productData?.images.map((imageData, index) => {
                             const imageUrl =
                             imageData && imageData.data?.data
                               ? convertToBase64(imageData.data.data)
                               : (imageData?.base64Url || 'https://i.pinimg.com/736x/8d/62/26/8d6226d7ea86222727a6f09519a0042d.jpg');

                            return (
                                <div key={index} className="flex justify-center items-center h-full w-full">
                                    <img src={imageUrl} alt={`Product image ${index + 1}`} className="max-w-full max-h-full object-contain rounded" />
                                </div>
                            );
                        })}
                        
                    </Carousel>
                </Card>

                <Card className="w-full max-w-md lg:max-w-xl min-h-[32rem] flex flex-col justify-between p-6">
                    <div>
                        <Typography className="mb-4" variant="h3">
                            {productData?.name}
                        </Typography>
                        <Typography variant="h5">${productData?.price}</Typography>
                        <Typography className="mt-4 text-base font-normal leading-7 text-gray-500">
                            {productData?.description}
                        </Typography>
                        <div className="my-8 flex items-center gap-2">
                            <Rating value={Math.round(averageRating)} className="text-amber-500" readonly />
                            <Typography className="text-sm font-bold text-gray-700">
                                {averageRating.toFixed(1)}/5 ({reviewsData?.length} reviews)
                            </Typography>
                        </div>
                        <Typography className="text-base font-normal leading-7 text-gray-500">
                            <strong>Category:</strong> {productData?.categories.map(category => category.name).join(', ')}
                        </Typography>
                        <Typography className="text-base font-normal leading-7 text-gray-500">
                            <strong>Stock:</strong> {productData?.quantity} items available
                        </Typography>
                    </div>
                    <div className="my-4 flex flex-col w-full gap-3 lg:flex-row">
                        <Button color="gray" className="w-full lg:w-52" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        {isAuth && (
                            <IconButton
                                onClick={handleToggleWishlist}
                                variant="text"
                                color="gray"
                            >
                            {wishlistItems && wishlistItems.some(item => item.productId === productId) ? (
                                <HeartIconFilled className="h-6 w-6 text-red-500" />
                            ) : (
                                <HeartIcon className="h-6 w-6" />
                            )}
                            </IconButton>
                        )}


                    </div>
                    <div className="my-4 flex flex-col w-full gap-3 lg:flex-row">
                        <Button color="blue-gray" className="w-full lg:w-52" onClick={handleOpenReviewForm}>
                            Add Review
                        </Button>
                        {reviewsData && reviewsData.length > 0 && (
                            <Button color="blue-gray" className="w-full lg:w-52" onClick={handleOpenReviews}>
                                Reviews
                            </Button>
                        )}
                    </div>
                </Card>
            </div>

            {reviewsData && (
                <ReviewDialog open={openReviews} handleOpen={handleOpenReviews} reviews={reviewsData} />
            )}

            {isAuth ? (
                <ReviewFormDialog open={openReviewForm} handleOpen={handleOpenReviewForm} onSubmit={handleReviewSubmit} />
            ) : (
                <LoginDialog open={!isAuth && openReviewForm} handleOpen={handleOpenReviewForm} />
            )}
            <CartButton onClick={handleCartButtonClick} />
        </section>
    );
};

export default ProductPage;
