import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { convertToBase64 } from '@/lib/utils';
import { Product } from '@/types/products/Product';
import ProductDialog from '../dialog/ProductDialog';
import { CardPlacehoderSkeleton } from '../skeleton/CardSkeleton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl =
    product.images[0] && product.images[0].data?.data
      ? convertToBase64(product.images[0].data.data)
      : (product.images[0]?.base64Url || 'https://i.pinimg.com/736x/8d/62/26/8d6226d7ea86222727a6f09519a0042d.jpg');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  try {
    return (
      <>
        <Card
          onClick={handleOpen}
          className="block w-full sm:w-72 max-h-80 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer m-2 p-1 overflow-hidden bg-blue-gray-100"
        >
          <CardHeader shadow={false} floated={false} className="h-40">
            <img src={imageUrl} alt="card-image" className="h-full w-full object-contain" />
          </CardHeader>
          <CardBody className="h-40 flex flex-col justify-between">
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {product.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                ${product.price}
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal opacity-75">
                Categories: {product.categories.map((category) => category.name).join(', ')}
              </Typography>
            </div>
          </CardBody>
        </Card>
        <ProductDialog open={open} handleOpen={handleOpen} product={product} />
      </>
    );
  } catch (error) {
    console.error('Error rendering ProductCard:', error);
    return <CardPlacehoderSkeleton />;
  }
};

export default ProductCard;
