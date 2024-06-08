import React, { useState } from 'react';
import { Dialog, DialogBody, DialogHeader, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import toast, { Toaster } from 'react-hot-toast';
import ImageUploadField from '../input/ImageUpload';
import { SelectCategories } from '../select/SelectCategories';
import { useCreateImage } from '@/hooks/useImage';
import { useCreateProduct } from '@/hooks/useProducts';
import { fileToDataURL } from '@/lib/utils';

interface AddProductDialogProps {
  open: boolean;
  handleOpen: () => void;
}

interface NewProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images?: ArrayBuffer[];
  imageUrls: string[]
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, handleOpen }) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    images: [],
    imageUrls: []
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const createImageMutation = useCreateImage();
  const createProductMutation = useCreateProduct();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log("Selected Category ID:", categoryId);
  };
  const handleSubmit = async (product: NewProduct) => {
    const newProductData = {name: product.name,price: product.price, quantity: 1, description: product.description, categories: [{id: selectedCategory}]}
    const newProduct = await createProductMutation.mutateAsync(newProductData)
    if (product.images)
    product.imageUrls.forEach(async image =>  {
        console.log(image)
        const imageData = {
            product: {id: newProduct.id},
            base64Url: image
        }
        await createImageMutation.mutateAsync(imageData)
    });
    
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    setNewProduct(prevProduct => ({
      ...prevProduct,
      price: isNaN(price) ? 0 : price,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value);
    setNewProduct(prevProduct => ({
      ...prevProduct,
      quantity: isNaN(quantity) ? 0 : quantity,
    }));
  };
  const handleImagesUpload = (images: File[]) => {
    const imageBase64StringsPromises = images.map(async file => await fileToDataURL(file))
    
    Promise.all(imageBase64StringsPromises).then(strings => {
      
      setNewProduct(prevProduct => ({
        ...prevProduct,
        imageUrls: strings,
      }));
    });
  };
  

  const clearForm = () => {
    setNewProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      images: [],
      imageUrls: []
    });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price > 0 && newProduct.imageUrls && newProduct.imageUrls.length > 0) {
      handleSubmit(newProduct);
      toast.success('Product added successfully');
      clearForm();
    } else {
      toast.error('Please fill out all fields correctly');
    }
  };

  return (
    <Dialog size="xl" open={open} handler={handleOpen}>
      <Toaster />
      <DialogHeader className="bg-gradient-to-r from-lightBlue-500 to-cyan-500">
        <h2 className="text-white text-lg font-semibold">Add New Product</h2>
      </DialogHeader>
      <DialogBody className='h-[32rem] overflow-scroll'>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <Input
                      type="text"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="w-full" crossOrigin={undefined}          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <Textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <SelectCategories onCategoryChange={handleCategoryChange} />
          <p>Selected Category ID: {selectedCategory}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">Price</label>
          <Input
                      type="number"
                      id="price"
                      name="price"
                      value={newProduct.price}
                      onChange={handlePriceChange}
                      placeholder="Enter product price"
                      className="w-full" crossOrigin={undefined}          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Quantity</label>
          <Input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={newProduct.quantity}
                      onChange={handleQuantityChange}
                      placeholder="Enter product quantity"
                      className="w-full" crossOrigin={undefined}          />
        </div>
        <ImageUploadField onImagesUpload={handleImagesUpload} />
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleAddProduct}>
          <PlusIcon className="w-5 h-5 mr-2" /> Add Product
        </Button>
        <Button color="gray" onClick={handleOpen}>Cancel</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddProductDialog;
