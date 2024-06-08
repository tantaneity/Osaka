import React from 'react';
import { Typography } from '@material-tailwind/react';
import DashboardLayout from '../DashboardLayout';
import DashboardProductList from '@/components/lists/DashboardProductList';

const ProductDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-2 sm:p-4">
        <Typography variant='h1' className='text-2xl mt-5 mb-8'>Product Management</Typography>
        <DashboardProductList />
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboardLayout;
