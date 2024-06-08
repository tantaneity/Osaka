import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Product } from "@/types/products/Product";
import { useSearchProducts } from "@/hooks/useProducts";
import ProductCard from "../card/ProductCard";
import { Card, Spinner } from "@material-tailwind/react";

type SearchProductListProps = {
  query: string;
  category?: string;
};

const SearchProductList = ({ query, category }: SearchProductListProps) => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data: newProducts } = useSearchProducts({ name: query, categoryName:category, limit: 10, offset });

  useEffect(() => {
    if (newProducts && loading) {
      if (newProducts.length > 0) {
        setProducts((prevProducts) => {
          const uniqueNewProducts = newProducts.filter(
            newProduct => !prevProducts.some(prevProduct => prevProduct.id === newProduct.id)
          );
          return [...prevProducts, ...uniqueNewProducts];
        });
        setOffset((prevOffset) => prevOffset + newProducts.length);
        setHasMore(newProducts.length === 10);
      } else {
        setHasMore(false); 
      }
      setLoading(false);
    }
  }, [newProducts, loading]);

  const loadMoreProducts = () => {
    if (!loading && hasMore) { 
      setLoading(true);
    }
  };

  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    setLoading(true);
  }, [query, category]);

  return (
    <Card>
      <InfiniteScroll
            dataLength={products.length}
            next={loadMoreProducts}
            hasMore={hasMore}
            className="overflow-y-scroll no-scrollbar"
            loader={<div className="flex justify-center items-center h-96"><Spinner /></div>}
          >
            <div className="mt-5 mb-5 p-5 relative flex flex-wrap justify-center">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </InfiniteScroll>
    </Card>
    
  );
};

export default SearchProductList;
