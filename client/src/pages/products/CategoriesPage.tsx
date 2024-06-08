import React, { useState } from 'react';
import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';
import CategoryList from '@/components/lists/CategoryList';

const CategoriesPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCartButtonClick = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
      setDrawerOpen(false);
  };

  return (
    <div>
      <CartDrawler open={drawerOpen} onClose={closeDrawer} />
      <CategoryList />
      <CartButton onClick={handleCartButtonClick} />
    </div>
  );
};

export default CategoriesPage;
