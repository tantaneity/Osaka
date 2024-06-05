import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';
import SearchProductList from '@/components/lists/SearchProductList';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('name') || '';
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleCartButtonClick = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };
  return (
    <div className="relative container mx-auto p-4">
        <CartDrawler open={drawerOpen} onClose={closeDrawer} />
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <SearchProductList query={query} />
      <CartButton onClick={handleCartButtonClick} />
    </div>
  );
};

export default SearchResults;
