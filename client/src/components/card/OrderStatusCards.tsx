import React from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import { ArrowPathIcon, CheckCircleIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useGetOrdersByUserId } from '@/hooks/useOrders';
import useUserStore from '@/store/UserStore';

interface OrderStatusCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  bgColor: string;
  textColor: string;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  icon,
  title,
  count,
  bgColor,
  textColor,
}) => (
  <Card className="flex flex-col items-center justify-center w-full sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 m-2">
    <CardBody className="flex flex-col items-center justify-center">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${bgColor}`}>
        {icon}
      </div>
      <h5 className="text-gray-500 mt-2 text-center">{title}</h5>
      <h3 className={`text-2xl font-bold ${textColor}`}>{count}</h3>
    </CardBody>
  </Card>
);

const OrderStatusCards: React.FC = () => {
  const {user} = useUserStore()
  const { data: orders, isLoading, isError } = useGetOrdersByUserId(user?.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders</div>;

  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(order => order.orderStatus.status_name === 'Pending').length || 0;
  const processingOrders = orders?.filter(order => order.orderStatus.status_name === 'Processing').length || 0;
  const completeOrders = orders?.filter(order => order.orderStatus.status_name === 'Complete').length || 0;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <OrderStatusCard
        icon={<ShoppingCartIcon className='h-[25px] w-[25px]' color='red' />}
        title="Total Orders"
        count={totalOrders}
        bgColor="bg-red-200"
        textColor="text-red-600"
      />
      <OrderStatusCard
        icon={<ArrowPathIcon className='h-[25px] w-[25px]' color='orange' />}
        title="Pending Orders"
        count={pendingOrders}
        bgColor="bg-orange-200"
        textColor="text-orange-600"
      />
      <OrderStatusCard
        icon={<TruckIcon className='h-[25px] w-[25px]' color='blue' />}
        title="Processing Orders"
        count={processingOrders}
        bgColor="bg-blue-200"
        textColor="text-blue-600"
      />
      <OrderStatusCard
        icon={<CheckCircleIcon className='h-[25px] w-[25px]' color='green' />}
        title="Complete Orders"
        count={completeOrders}
        bgColor="bg-green-200"
        textColor="text-green-600"
      />
    </div>
  );
};

export default OrderStatusCards;
