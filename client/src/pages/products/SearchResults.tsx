import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';
import SearchProductList from '@/components/lists/SearchProductList';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('name') || '';
    let category = new URLSearchParams(location.search).get('category') || '';
    category = category.replace(/-/g, ' '); 

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleCartButtonClick = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };
    const renderTitle = () => {
      if (query && category) {
          return `Search Results for "${query}" in category "${category}"`;
      } else if (query) {
          return `Search Results for "${query}"`;
      } else if (category) {
          return `Search Results in category "${category}"`;
      } else {
          return 'Search Results';
      }
  };
    return (
        <div className="relative container mx-auto p-4">
            <CartDrawler open={drawerOpen} onClose={closeDrawer} />
            <h1 className="text-2xl font-bold mb-4">
                {renderTitle()}
            </h1>
            <SearchProductList query={query} category={category} /> 
            <CartButton onClick={handleCartButtonClick} />
        </div>
    );
};

export default SearchResults;
