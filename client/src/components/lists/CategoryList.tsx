import React from 'react';
import { Category } from '@/types/category/Category';
import { useGetAllCategories, useGetSubcategories } from '@/hooks/useCategory';
import CategoryCard from '@/components/card/CategoryCard';
import { Spinner } from '@material-tailwind/react';

export interface CategoryListProps {
  onCategoryClick?: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryClick }) => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategories();

  if (categoriesLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (categoriesError) {
    return <div>Error: {categoriesError.message}</div>;
  }

  const parentCategories = categories?.filter(category => !category.parentCategory);

  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full h-auto">
      {parentCategories?.map(category => (
        <CategoryWithSubcategories key={category.id} category={category} onCategoryClick={onCategoryClick} />
      ))}
    </div>
  );
};

export const CategoryWithSubcategories: React.FC<{ category: Category, onCategoryClick?: (category: Category) => void }> = ({ category, onCategoryClick }) => {
  const { data: subcategories, isLoading, error } = useGetSubcategories(category.id);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div>Error loading subcategories: {error.message}</div>;
  }

  return <CategoryCard category={category} subcategories={subcategories || []} onClick={() => onCategoryClick && onCategoryClick(category)} />;
};

export default CategoryList;
