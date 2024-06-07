import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { convertToBase64 } from '@/lib/utils';
import { Product } from '@/types/products/Product';
import ProductDialog from '../dialog/ProductDialog';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const ab = product.images[0].data.data;
  const imageUrl = convertToBase64(ab);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Card onClick={handleOpen} className="block w-72 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer m-2 p-1">
        <CardHeader shadow={false} floated={false} className="h-48">
          <img src={imageUrl} alt="card-image" className="h-full w-full object-contain" />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex-basis items-center justify-between">
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
      <ProductDialog open={open} handleOpen={handleOpen} product={product} />
    </>
  );
};

export default ProductCard;
