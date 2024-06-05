import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography, Spinner, Alert, IconButton, ListItem, ListItemPrefix, Avatar, List } from "@material-tailwind/react";
import { useGetOrderById } from '@/hooks/useOrders';
import { useGetProductById } from '@/hooks/useProducts';
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import AuthOnly from '@/access/AuthOnly';
import { OrderItem } from '@/types/shop/order/OrderItem';
import { convertToBase64 } from '@/lib/utils';
import { OrderStatus } from '@/types/shop/order/OrderStatus';


const OrderListItem: React.FC<{ item: OrderItem }> = ({ item }) => {
    const { data: product, isLoading, isError } = useGetProductById(item.product.id);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (isError || !product) {
        return <Typography variant="lead" color="red">Error loading product</Typography>;
    }

    return (
        <div className="mb-2 flex items-center justify-between p-4 bg-indigo-50 rounded-md">
            <ListItem key={item.id} className="w-max h-max">
            <ListItemPrefix>
                <Avatar variant="rounded" className='w-24 h-24' alt="item" src={convertToBase64(product.images[0].data.data)} />
            </ListItemPrefix>
                <Typography variant="h6" className="font-semibold p-3">{product.name}</Typography>
                <Typography className='p-3' variant="small">Quantity: {item.quantity}</Typography>
                <Typography className='p-3' variant="small">Price: ${item.price.toFixed(2)}</Typography>
            </ListItem>
        </div>
    );
};

const OrderPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { data: order, isLoading, isError } = useGetOrderById(orderId);
    const [_, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState(false);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen"><Alert color="red">Error loading order</Alert></div>;
    }
    console.log((order?.orderStatus as OrderStatus).color)
    return (
        <div className="flex justify-center items-center h-screen">
            <AuthOnly>
                <Card className="mx-auto w-full md:w-2/3 lg:w-1/2">
                    <CardHeader className={`relative h-56 bg-${(order?.orderStatus as OrderStatus).color}-200`}>
                        <Typography variant="h2" color="white" className="absolute bottom-4 left-4">Order Details</Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" className="mb-2">
                            Order ID: {order?.id}
                            <IconButton
                                className='ml-2 h-6 w-6'
                                onMouseLeave={() => setCopied(false)}
                                onClick={() => {
                                    copy(order?.id || '');
                                    setCopied(true);
                                }}
                            >
                                {copied ? (
                                    <CheckIcon className="h-3 w-3 text-white" />
                                ) : (
                                    <DocumentDuplicateIcon className="h-3 w-3 text-white" />
                                )}
                            </IconButton>
                        </Typography>

                        <Typography variant="small" className="mb-4">Date: {order?.createdAt.toLocaleString()}</Typography>
                        <Typography variant="small" className="mb-4">Total Amount: ${order?.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Typography>
                        <Typography variant="h6" className="mt-4 mb-2">Items:</Typography>
                        <List className="pl-5">
                            {order?.orderItems.map(item => (
                                <OrderListItem item={item} />
                            ))}
                        </List>
                    </CardBody>
                </Card>
            </AuthOnly>
        </div>
    );
};

export default OrderPage;
