import React, { useState } from 'react';
import { Dialog, DialogBody, IconButton, Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { XMarkIcon, ShoppingCartIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/24/solid'; // Добавлен иконка мусорной корзины
import { Product } from '@/types/products/Product';
import ProductCarousel from '../carousel/ProductCarousel';
import toast, { Toaster } from 'react-hot-toast';
import useCartStore from '@/store/CartStore';
import useUserStore from '@/store/UserStore';
import { useDeleteProduct } from '@/hooks/useProducts';
import DeleteProductDialog from './DeleteProductDialog';

interface ProductDialogProps {
  open: boolean;
  handleOpen: () => void;
  product: Product;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, handleOpen, product }) => {
  const { addItem } = useCartStore();
  const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
  const { isAdmin } = useUserStore();
  const deleteProductMutation = useDeleteProduct();
  const handleAddToCart = () => {
    if (product) {
      toast.success("Success")
      addItem(product, 1);
    }
  };
  const handleOpenDialog = () => {
    setOpenDeletionDialog(true);
  };
  const handleDeleteProduct = async () => {
    await deleteProductMutation.mutateAsync(product.id);
  };

  return (
    <Dialog size="xxl" open={open} handler={handleOpen} className="bg-transparent shadow-none backdrop-blur-sm">
      <Toaster />
      <DeleteProductDialog
        open={openDeletionDialog}
        setOpen={setOpenDeletionDialog}
        onDeleteProduct={handleDeleteProduct}
      />
      <DialogBody className="overflow-y-scroll no-scrollbar">
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
              {isAdmin && (
                  <IconButton className='h-6 w-6 p-5 m-2' size="sm" variant='text' onClick={handleOpenDialog}>
                    <TrashIcon color='red' className='h-6 w-6' />
                  </IconButton>
              )}
            </div>
          </CardBody>
        </Card>
      </DialogBody>
    </Dialog>
  );
};

export default ProductDialog;
