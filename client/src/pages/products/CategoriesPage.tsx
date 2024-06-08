import React, { useState } from 'react';
import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';
import CategoryList from '@/components/lists/CategoryList';
import { Card } from '@material-tailwind/react';

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
      <Card className='p-5 m-10 bg-blue-50'>
        <CategoryList />
      </Card>
      
      <CartButton onClick={handleCartButtonClick} />
    </div>
  );
};

export default CategoriesPage;
