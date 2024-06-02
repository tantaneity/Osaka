import React from 'react';
import { Category } from '@/types/category/Category';
import { useGetAllCategories, useGetSubcategories } from '@/hooks/useCategory';
import CategoryCard from '@/components/card/CategoryCard';
import { Spinner } from '@material-tailwind/react';

const CategoriesPage: React.FC = () => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategories();

  if (categoriesLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (categoriesError) {
    return <div>Error: {categoriesError.message}</div>;
  }

  const parentCategories = categories?.filter(category => !category.parentCategory);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {parentCategories?.map(category => (
        <CategoryWithSubcategories key={category.id} category={category} />
      ))}
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
