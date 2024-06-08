import React from 'react';
import { Typography } from '@material-tailwind/react';
import DashboardLayout from '../DashboardLayout';
import DashboardCategoryList from '@/components/lists/DashboardCategoryList';

const CategoryDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center">
        <Typography variant='h1' className='text-2xl mt-5 mb-8'>Category</Typography>
        <DashboardCategoryList/>
      </div>
    </DashboardLayout>
  );
};

export default CategoryDashboardLayout;
