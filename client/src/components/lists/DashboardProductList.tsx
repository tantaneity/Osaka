import { useState, useEffect } from 'react';
import { useGetProducts } from '@/hooks/useProducts';
import ProductCard from '../card/ProductCard';
import AddProductCard from '../card/AddProductCard';
import { CardPlacehoderSkeleton } from '../skeleton/CardSkeleton';
import { Product } from '@/types/products/Product';
import AddProductDialog from '../dialog/AddProductDialog';

function DashboardProductList() {
  const { data, isLoading, isError } = useGetProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(data || []);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  if (isLoading) return <div><CardPlacehoderSkeleton /></div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='relative flex flex-wrap justify-center'>
      <AddProductCard onClick={handleOpenDialog} />
      {products.map((product: Product) => (
        <div key={product.name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center">
          <ProductCard product={product} />
        </div>
      ))}
      <AddProductDialog open={isDialogOpen} handleOpen={handleCloseDialog} onAddProduct={handleAddProduct} />
    </div>
  );
}

export default DashboardProductList;
