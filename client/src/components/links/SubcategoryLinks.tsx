import React, { useState, useEffect } from 'react'; // Импортируем useEffect
import { Link } from 'react-router-dom';
import { Category } from '@/types/category/Category';
import { IconButton, List, ListItem } from '@material-tailwind/react';
import useUserStore from '@/store/UserStore';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useDeleteCategory } from '@/hooks/useCategory';
import toast, { Toaster } from 'react-hot-toast';
import DeleteProductDialog from '../dialog/DeleteProductDialog';

interface SubcategoryLinksProps {
  subcategories: Category[];
}

const SubcategoryLinks: React.FC<SubcategoryLinksProps> = ({ subcategories: initialSubcategories }) => {
  const { isAdmin } = useUserStore();
  const useDeleteCategoryMutation = useDeleteCategory();
  const [subcategories, setSubcategories] = useState<Category[]>(initialSubcategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

  const handleDelete = async () => {
    if (selectedSubcategory !== null) {
      await useDeleteCategoryMutation.mutateAsync(selectedSubcategory);
      toast.success("Success!");
      setSubcategories(subcategories.filter(subcategory => subcategory.id !== selectedSubcategory));
      setSelectedSubcategory(null);
    }
  };

  const handleOpenDialog = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    setDialogOpen(true);
  };

  useEffect(() => {
    setSubcategories(initialSubcategories);
  }, [initialSubcategories]);

  return (
    <>
      <List className="mb-4 w-full bg-blue-gray-50 rounded-lg">
        <Toaster />
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="flex items-center justify-between p-2">
            <Link
              to={`/search/?category=${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-black-200 flex-grow"
            >
              <ListItem className="bg-blue-gray-200">
                {subcategory.name}
              </ListItem>
            </Link>
            {isAdmin && (
              <IconButton
                onClick={() => handleOpenDialog(subcategory.id)}
                aria-label="delete"
                className="ml-2 bg-blue-gray-100"
              >
                <TrashIcon className='h-5 w-5' color='red' />
              </IconButton>
            )}
          </div>
        ))}
      </List>
      <DeleteProductDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onDeleteProduct={handleDelete}
        title="Confirm Deletion"
        bodyText="Are you sure you want to delete this subcategory? This will also delete all associated products."
        cancelText="No, Cancel"
        deleteText="Yes, Delete"
      />
    </>
  );
};

export default SubcategoryLinks;
