import React from 'react';
import AccountLayout from '@/components/layout/account/AccountLayout';
import { Typography } from '@material-tailwind/react';
import OrderStatusCards from '../../card/OrderStatusCards';
import { OrderTable } from '../../table/OrdersTabel';

const MyOrders: React.FC = () => {
  return (
    <AccountLayout>
      <Typography className='text-2xl mb-4'>My Orders</Typography>
      <OrderStatusCards/>
      <OrderTable/>
    </AccountLayout>
  );
};

export default MyOrders;
