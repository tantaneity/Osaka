import React from 'react';
import { Dialog, DialogBody, IconButton, Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { XMarkIcon, ShoppingCartIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types/products/Product';
import ProductCarousel from '../carousel/ProductCarousel';
import { useCreateCartItem, useGetCartsByUserId } from '@/hooks/useCart';
import useUserStore from '@/store/UserStore';
import toast, { Toaster } from 'react-hot-toast';

interface ProductDialogProps {
  open: boolean;
  handleOpen: () => void;
  product: Product;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, handleOpen, product }) => {
  const { isAuth, user } = useUserStore();
  const { mutate: addToCart } = useCreateCartItem();
  const { data: cartData} = useGetCartsByUserId(user?.id);
  const cartId = cartData && cartData.length > 0 ? cartData[0].id : null;
  const handleAddToCart = () => {
    if (!isAuth){
      toast.error('Need to login!')
    }else{
      if (product && cartId) {
        addToCart({ product: {id: product.id}, quantity: 1, cart: { id: cartId} });
      }
    }
    
  };
  return (
    <Dialog size="xxl" open={open} handler={handleOpen} className="bg-transparent shadow-none backdrop-blur-sm">
      <Toaster/>
      <DialogBody className="overflow-scroll">
        <Card className="max-w-xl mx-auto">
          <IconButton className='h-6 w-6 p-5 m-2' size="sm" variant='text' onClick={handleOpen}>
            <XMarkIcon className='h-6 w-6' />
          </IconButton>
          <CardBody className="text-center">
            <ProductCarousel images={product.images} />
            <Typography variant="h4" color="blue-gray" className="mb-5 mt-6">
              {product.name}
            </Typography>
            <Typography color="gray">
              {product.description}
            </Typography>
            <Typography className='mt-5' variant="h5" color="gray">
              ${product.price}
            </Typography>
            <div className="flex justify-center items-center space-x-4 mt-10">
              <Button onClick={handleAddToCart} size="sm" variant='outlined' color="black" className="flex items-center">
                <ShoppingCartIcon className="w-5 h-5 mr-1" />
                Add to Cart
              </Button>
              <a href={`/drinks/${product.id}`}>
                <Button size="sm" variant='outlined' color="black" className="flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-1" />
                  More
                </Button>
              </a>
            </div>
          </CardBody>
        </Card>
      </DialogBody>
    </Dialog>
  );
};

export default ProductDialog;
