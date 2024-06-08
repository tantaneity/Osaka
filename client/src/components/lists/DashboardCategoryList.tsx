import { useGetAllCategories } from "@/hooks/useCategory";
import { CategoryListProps, CategoryWithSubcategories } from "./CategoryList";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import AddProductCard from "../card/AddProductCard";
import AddCategoryDialog from "../dialog/AddCategoryDialog";



const DashboardCategoryList: React.FC<CategoryListProps> = ({ onCategoryClick }) => {
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategories();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
      };
    const handleCloseDialog = () => {
    setIsDialogOpen(false);
    };
    if (categoriesLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (categoriesError) {
        return <div>Error: {categoriesError.message}</div>;
    }

    const parentCategories = categories?.filter(category => !category.parentCategory);

    return (
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-screen h-auto">
            <AddProductCard onClick={handleOpenDialog} />
            {parentCategories?.map(category => (
                <CategoryWithSubcategories key={category.id} category={category} onCategoryClick={onCategoryClick} />
            ))}
            <AddCategoryDialog open={isDialogOpen} handleOpen={handleCloseDialog}  />
            
        </div>
    );
}
export default DashboardCategoryList