import React, { useState } from 'react';
import { Category } from '@/types/category/Category';
import { useGetAllCategories, useGetSubcategories } from '@/hooks/useCategory';
import CategoryCard from '@/components/card/CategoryCard';
import { Spinner } from '@material-tailwind/react';
import CartButton from '@/components/button/CartButton';
import CartDrawler from '@/components/drawler/CartDrawler';

const CategoriesPage: React.FC = () => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategories();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCartButtonClick = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
      setDrawerOpen(false);
  };
  if (categoriesLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (categoriesError) {
    return <div>Error: {categoriesError.message}</div>;
  }

  const parentCategories = categories?.filter(category => !category.parentCategory);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CartDrawler open={drawerOpen} onClose={closeDrawer} />
      {parentCategories?.map(category => (
        <CategoryWithSubcategories key={category.id} category={category} />
      ))}
       <CartButton onClick={handleCartButtonClick} />
    </div>
  );
};

const CategoryWithSubcategories: React.FC<{ category: Category }> = ({ category }) => {
  const { data: subcategories, isLoading, error } = useGetSubcategories(category.id);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div>Error loading subcategories: {error.message}</div>;
  }

  return <CategoryCard category={category} subcategories={subcategories || []} />;
};

export default CategoriesPage;
