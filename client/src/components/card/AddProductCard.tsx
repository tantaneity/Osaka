import React from 'react';
import { Card } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';

interface AddProductCardProps {
  onClick: () => void;
}

const AddProductCard: React.FC<AddProductCardProps> = ({ onClick }) => {
  return (
    <Card onClick={onClick} className="block w-full sm:w-72 max-h-80 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer m-2 p-1 overflow-hidden bg-blue-gray-50">
      <div className="flex justify-center items-center h-full">
      <PlusIcon className="h-5 w-5" />
      </div>
    </Card>
  );
};

export default AddProductCard;
