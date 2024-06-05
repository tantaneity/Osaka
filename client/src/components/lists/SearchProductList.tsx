import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Product } from "@/types/products/Product";
import { useSearchProducts } from "@/hooks/useProducts";
import ProductCard from "../card/ProductCard";
import { Spinner } from "@material-tailwind/react";

type SearchProductListProps = {
  query: string;
};

const SearchProductList = ({ query }: SearchProductListProps) => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data: newProducts } = useSearchProducts({ name: query, limit: 10, offset });

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
        setHasMore(newProducts.length === 10); // Set hasMore to true if we received the maximum number of products
      } else {
        setHasMore(false); // No new products means we've reached the end
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
  }, [query]);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={loadMoreProducts}
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={<p>No more products</p>}
    >
      <div className="relative flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SearchProductList;
