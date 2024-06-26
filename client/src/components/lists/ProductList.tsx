import { useSearchProducts } from '@/hooks/useProducts';
import ProductCard from '../card/ProductCard';
import { CardPlacehoderSkeleton } from '../skeleton/CardSkeleton';

function ProductList() {
    const {data, isLoading, isError } = useSearchProducts({name:'', categoryName: ''});
    
    if (isLoading) return <div><CardPlacehoderSkeleton/></div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data)
    return (
        <div className='relative flex flex-wrap justify-center'>
          {data && data.map(product => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      );
}

export default ProductList;
