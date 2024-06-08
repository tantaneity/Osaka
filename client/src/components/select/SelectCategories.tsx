import React, { useState } from "react";
import { useGetAllCategories } from "@/hooks/useCategory";
import { Select, Option  } from "@material-tailwind/react";
import { Category } from "@/types/category/Category";

interface SelectCategoriesProps {
    onCategoryChange: (categoryId: string) => void;
}

export function SelectCategories({ onCategoryChange }: SelectCategoriesProps) {
  const { data: categories, isLoading } = useGetAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category)
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <Select
          value={selectedCategory}
          onChange={(category) => handleChange(category || '')}
          placeholder="Select category"
        >
          {categories?.map((category: Category) => (
            <Option key={category.id.toString()} value={category.id.toString()}>
              {category.name}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
}
