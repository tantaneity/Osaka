import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card, CardHeader, CardBody, Typography, Spinner, Alert,
  IconButton, List, ListItem, ListItemPrefix, Avatar
} from "@material-tailwind/react";
import { useGetOrderById } from '@/hooks/useOrders';
import { useGetProductById } from '@/hooks/useProducts';
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import AuthOnly from '@/access/AuthOnly';
import { convertToBase64 } from '@/lib/utils';
import { OrderItem } from '@/types/shop/order/OrderItem';
import { OrderStatus } from '@/types/shop/order/OrderStatus';

const OrderListItem: React.FC<{ item: OrderItem }> = ({ item }) => {
  const { data: product, isLoading, isError } = useGetProductById(item.product.id);

  if (isLoading) {
    return <div className="flex justify-center items-center"><Spinner /></div>;
  }

  if (isError || !product) {
    return <Typography variant="lead" color="red">Error loading product</Typography>;
  }

  return (
    <div className="mb-2 flex flex-col sm:flex-row items-center justify-between p-4 bg-indigo-50 rounded-md">
      <ListItem key={item.id} className="w-full sm:w-auto flex items-center">
        <ListItemPrefix>
          <Avatar
            variant="rounded"
            className='w-24 h-24 object-cover'
            alt="item"
            src={convertToBase64(product.images[0].data.data)}
          />
        </ListItemPrefix>
        <div className="flex flex-col sm:flex-row sm:items-center sm:ml-4">
          <Typography variant="h6" className="font-semibold p-3">{product.name}</Typography>
          <Typography className='p-3' variant="small">Quantity: {item.quantity}</Typography>
          <Typography className='p-3' variant="small">Price: ${item.price.toFixed(2)}</Typography>
        </div>
      </ListItem>
    </div>
  );
};

const OrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, isError } = useGetOrderById(orderId);
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen"><Alert color="red">Error loading order</Alert></div>;
  }

  const handleCopy = () => {
    copy(order?.id || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const orderStatusColor = (order?.orderStatus as OrderStatus)?.color || 'gray';

  return (
    <div className="flex justify-center items-center py-10 px-4 sm:px-0">
      <AuthOnly>
        <Card className="w-full sm:w-2/3 lg:w-1/2">
          <CardHeader className={`relative h-40 sm:h-56 bg-${orderStatusColor}-200`}>
            <Typography variant="h2" color="white" className="absolute bottom-4 left-4 text-lg sm:text-2xl">
              Order Details
            </Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" className="mb-2 text-base sm:text-lg">
              Order ID: {order?.id}
              <IconButton
                className='ml-2 h-6 w-6'
                onMouseLeave={() => setCopied(false)}
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckIcon className="h-3 w-3 text-white" />
                ) : (
                  <DocumentDuplicateIcon className="h-3 w-3 text-white" />
                )}
              </IconButton>
            </Typography>

            <Typography variant="small" className="mb-4 text-sm">Date: {new Date(order?.createdAt || new Date()).toLocaleString()}</Typography>
            <Typography variant="small" className="mb-4 text-sm">Total Amount: ${order?.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Typography>
            <Typography variant="h6" className="mt-4 mb-2 text-base sm:text-lg">Items:</Typography>
            <List className="pl-0 sm:pl-5">
              {order?.orderItems.map(item => (
                <OrderListItem key={item.id} item={item} />
              ))}
            </List>
          </CardBody>
        </Card>
      </AuthOnly>
    </div>
  );
};

export default OrderPage;
