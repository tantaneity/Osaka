import React from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { convertToBase64 } from '@/lib/utils';
import { Image } from '@/types/products/Image';

interface ProductCarouselProps {
  images: Image[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  return (
    <Carousel className='rounded-xl h-full w-full' autoplay={true} loop={true}
      prevArrow={({ handlePrev }) => (
        <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
          <ArrowLeftCircleIcon color='black' className='h-6 w-6' />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
          <ArrowRightCircleIcon color='black' className='h-6 w-6' />
        </IconButton>
      )}
    >
      {images.map((imageData, index) => {
        const imageCUrl = convertToBase64(imageData.data.data);
        return (
          <div key={index} className="flex justify-center items-center h-full w-full">
            <img src={imageCUrl} alt={`Product image ${index + 1}`} className="max-w-full max-h-full object-contain rounded" />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductCarousel;
