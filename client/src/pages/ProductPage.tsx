import React, { useState } from 'react';
import { useGetProductById } from "@/hooks/useProducts";
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
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { convertToBase64 } from "@/lib/utils";
import { ProductPageSkeleton } from "@/components/skeleton/ProductPageSkeleton";
import { ReviewDialog } from '@/components/dialog/ReviewDialog';
import ReviewFormDialog from '@/components/dialog/ReviewFormDialog';
import Review from '@/types/review/Review';

const ProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, error, isLoading } = useGetProductById(productId);

    const [openReviews, setOpenReviews] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const handleOpenReviews = () => setOpenReviews(!openReviews);
    const handleOpenForm = () => setOpenForm(!openForm);

    const handleReviewSubmit = (review: { user: string; rating: number; comment: string }) => {
        // Here you would typically send the review to your server and update the state.
        console.log('New Review:', review);
    };

    if (isLoading) {
        return <div><ProductPageSkeleton /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const calculateAverageRating = (reviews: Review[] | undefined) => {
        if (!reviews || reviews.length === 0) {
            return 5;
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating(data?.reviews);

    return (
        <section className="py-8 px-4 sm:px-8">
            <div className="mx-auto container grid place-items-center gap-8 grid-cols-1 lg:grid-cols-2">
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
                        {data?.images.map((imageData, index) => {
                            const imageCUrl = convertToBase64(imageData.data.data);
                            return (
                                <div key={index} className="flex justify-center items-center h-full w-full">
                                    <img src={imageCUrl} alt={`Product image ${index + 1}`} className="max-w-full max-h-full object-contain rounded" />
                                </div>
                            );
                        })}
                    </Carousel>
                </Card>

                <Card className="w-full max-w-md lg:max-w-xl min-h-[32rem] flex flex-col justify-between p-6">
                    <div>
                        <Typography className="mb-4" variant="h3">
                            {data?.name}
                        </Typography>
                        <Typography variant="h5">${data?.price}</Typography>
                        <Typography className="mt-4 text-base font-normal leading-7 text-gray-500">
                            {data?.description}
                        </Typography>
                        <div className="my-8 flex items-center gap-2">
                            <Rating value={averageRating} className="text-amber-500" readonly />
                            <Typography className="text-sm font-bold text-gray-700">
                                {averageRating.toFixed(1)}/5 ({data?.reviews.length} reviews)
                            </Typography>
                        </div>
                        <Typography className="text-base font-normal leading-7 text-gray-500">
                            <strong>Category:</strong> {data?.categories.map(category => category.name).join(', ')}
                        </Typography>
                        <Typography className="text-base font-normal leading-7 text-gray-500">
                            <strong>Stock:</strong> {data?.quantity} items available
                        </Typography>
                    </div>
                    <div className="my-4 flex flex-col sm:flex-row w-full items-center gap-3">
                        <Button color="gray" className="w-full sm:w-52">
                            Add to Cart
                        </Button>
                        <IconButton color="gray" variant="text" className="shrink-0">
                            <HeartIcon className="h-6 w-6" />
                        </IconButton>
                    </div>
                    <div className="my-4 flex flex-col sm:flex-row w-full items-center gap-3">
                        <Button color="blue-gray" className="w-full sm:w-52" onClick={handleOpenForm}>
                            Add Review
                        </Button>
                        {data?.reviews && data.reviews.length > 0 && (
                            <Button color="blue-gray" className="w-full sm:w-52" onClick={handleOpenReviews}>
                                Reviews
                            </Button>
                        )}
                    </div>
                </Card>
            </div>

            {data?.reviews && (
                <ReviewDialog open={openReviews} handleOpen={handleOpenReviews} reviews={data.reviews} />
            )}
            <ReviewFormDialog open={openForm} handleOpen={handleOpenForm} onSubmit={handleReviewSubmit} />
        </section>
    );
};

export default ProductPage;
