import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  Input,
  Checkbox,
  DialogBody,
  DialogHeader,
  IconButton,
  Carousel,
  Textarea,
} from '@material-tailwind/react';
import { Product } from '@/types/products/Product';
import { HeartIcon, ShoppingCartIcon, XMarkIcon, ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import useUserStore from '@/store/UserStore';

interface ProductCardProps {
  product: Product;
}

const convertToBase64 = (bytes: ArrayBuffer) => {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return `data:image/jpeg;base64,${base64String}`;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const ab = product.images[0].data.data
  const imageUrl =convertToBase64(ab);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  
  
  const handleAddComment = () => {
    if (comment.trim()) {
      setComment('');
      setComments([...comments]);
    }
  };
  return (
    <>
      <Card onClick={handleOpen} className="block w-72 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer m-2 p-1">
        <CardHeader shadow={false} floated={false} className="h-48">
          <img
            src={imageUrl}
            alt="card-image"
            className="h-full w-full object-contain"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product.price}
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="font-normal opacity-75 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
            {product.description}
          </Typography>
          <div>
            <Typography variant="small" color="gray" className="font-normal opacity-75">
              Categories: {product.categories.map(category => category.name).join(', ')}
            </Typography>
          </div>
        </CardBody>
        
      </Card>
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none backdrop-blur-sm"
        
        
      >
        <DialogBody className="overflow-scroll">
        
        <Card className="max-w-2xl mx-auto">
        <IconButton className='h-6 w-6 p-5 m-2' size="sm" variant='text' onClick={handleOpen}>
          <XMarkIcon className='h-6 w-6'/>
        </IconButton>
      <CardBody className="text-center">
      <Carousel className='rounded-xl h-full w-full' autoplay={true} loop={true}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <ArrowLeftCircleIcon color='black' className='h-6 w-6'/>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <ArrowRightCircleIcon color='black' className='h-6 w-6'/>
          </IconButton>
        )}
        >
          {product.images.map((imageData, index) => {
            const imageCUrl = convertToBase64(imageData.data.data);
            return (
              <div key={index} className="flex justify-center items-center h-full w-full">
                <img src={imageCUrl} alt={`Product image ${index + 1}`} className="max-w-full max-h-full object-contain rounded" />
              </div>
            );
          })}
        </Carousel>
        <Typography variant="h4" color="blue-gray" className="mb-5 mt-6">
          {product.name}
        </Typography>
        <Typography color="gray">
          {product.description}
        </Typography>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Typography variant="h5" color="gray">
            ${product.price}
          </Typography>
          <Button size="sm" variant='outlined' color="black" className="flex items-center">
            <ShoppingCartIcon className="w-5 h-5 mr-1" />
            Add to Cart
          </Button>
        </div><div className="mt-6">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Comments
          </Typography>
          <div className="mb-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <Typography color="gray">{comment}</Typography>
                </div>
              ))
            ) : (
              <Typography color="gray">No comments yet. Be the first to comment!</Typography>
            )}
          </div>
          <Textarea
            label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleAddComment} color="black">
            Submit
          </Button>
        </div>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between">
        <IconButton color="black" size="lg">
          <HeartIcon className="w-6 h-6" />
        </IconButton>
        
        <Button size="lg" color="pink">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProductCard;
