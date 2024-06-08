import React, { useState } from 'react';
import { Dialog, DialogBody, DialogHeader, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import toast, { Toaster } from 'react-hot-toast';
import ImageUploadField from '../input/ImageUpload';
import { SelectCategories } from '../select/SelectCategories';
import { fileToDataURL } from '@/lib/utils';
import { useCreateCategory } from '@/hooks/useCategory';

interface AddCategoryDialogProps {
  open: boolean;
  handleOpen: () => void;
}

interface NewCategory {
  name: string;
  description: string;
  image: string;
  parentCategoryId?: string;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, handleOpen }) => {
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: '',
    description: '',
    image: '',
    parentCategoryId: undefined
  });
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>('');
  const createCategoryMutation = useCreateCategory();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedParentCategory(categoryId);
    setNewCategory(prevCategory => ({
      ...prevCategory,
      parentCategoryId: categoryId
    }));
  };

  const handleSubmit = async (category: NewCategory) => {
    const newCategoryData = {
      name: category.name,
      description: category.description,
      base64Url: category.image,
      parentCategoryId: {id: category.parentCategoryId}
    };
    await createCategoryMutation.mutateAsync(newCategoryData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory(prevCategory => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleImageUpload = async (files: File[]) => {
    if (files.length > 0) {
      const imageBase64String = await fileToDataURL(files[0]);
      setNewCategory(prevCategory => ({
        ...prevCategory,
        image: imageBase64String,
      }));
    }
  };

  const clearForm = () => {
    setNewCategory({
      name: '',
      description: '',
      image: '',
      parentCategoryId: undefined
    });
    setSelectedParentCategory('');
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description && newCategory.image) {
      handleSubmit(newCategory);
      toast.success('Category added successfully');
      clearForm();
    } else {
      toast.error('Please fill out all fields correctly');
    }
  };

  return (
    <Dialog size="xl" open={open} handler={handleOpen}>
      <Toaster />
      <DialogHeader className="bg-gradient-to-r from-lightBlue-500 to-cyan-500">
        <h2 className="text-white text-lg font-semibold">Add New Category</h2>
      </DialogHeader>
      <DialogBody className="h-[32rem] overflow-scroll">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <Input
                      type="text"
                      id="name"
                      name="name"
                      value={newCategory.name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      className="w-full" crossOrigin={undefined}          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <Textarea
            id="description"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
            placeholder="Enter category description"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <SelectCategories onCategoryChange={handleCategoryChange} />
          <p>Selected Parent Category ID: {selectedParentCategory}</p>
        </div>
        <ImageUploadField onImagesUpload={handleImageUpload} />
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleAddCategory}>
          <PlusIcon className="w-5 h-5 mr-2" /> Add Category
        </Button>
        <Button color="gray" onClick={handleOpen}>Cancel</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddCategoryDialog;