import { useState } from 'react';
import { useGetProducts } from '@/hooks/useProducts';
import ProductCard from '../card/ProductCard';
import AddProductCard from '../card/AddProductCard';
import { CardPlacehoderSkeleton } from '../skeleton/CardSkeleton';
import { Product } from '@/types/products/Product';
import AddProductDialog from '../dialog/AddProductDialog';

function DashboardProductList() {
  const { data, isLoading, isError } = useGetProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  if (isLoading) return <div><CardPlacehoderSkeleton/></div>;
  if (isError) return <div>Error fetching data</div>;
  
  return (
    <div className='relative flex flex-wrap justify-center'>
      <AddProductCard onClick={handleOpenDialog} />
      {data && data.map((product: Product) => (
        <div key={product.name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center">
          <ProductCard product={product} />
        </div>
      ))}
      <AddProductDialog open={isDialogOpen} handleOpen={handleCloseDialog}  />
    </div>
  );
}

export default DashboardProductList;
