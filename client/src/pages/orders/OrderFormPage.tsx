import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, CreditCardIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  Input,
  Button,
  Spinner,
  Radio,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import useCartStore from '@/store/CartStore';
import { LocalCart } from '@/types/shop/cart/LocalCart';
import { isProduct } from '@/types/shop/cart/CartItem';
import AuthOnly from '@/access/AuthOnly';
import CartList from '@/components/lists/CartList';
import { useCreateOrder, useCreateOrderItem } from '@/hooks/useOrders';
import useUserStore from '@/store/UserStore';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

function calculateTotal(cart: LocalCart | null): number {
    if (!cart || !cart.items) {
        return 0;
    }
    return cart.items.reduce((total, item) => {
        if (isProduct(item.product)) return total + (item.product.price * item.quantity);
        else return 0
    }, 0);
}

const OrderFormPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const { cart } = useCartStore(); 
  const totalPrice = calculateTotal(cart)
  const {user} = useUserStore()
  const createOrderMutation = useCreateOrder();
  const createOrderItemMutation = useCreateOrderItem();
  const products = cart?.items.map(item => item.product)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const orderData = {
        user: {id: user?.id || ''},
        orderStatus: {id: 3},
      };
      const order = await createOrderMutation.mutateAsync(orderData);
      if (cart)
      for (const cartItem of cart?.items) {
        if (isProduct(cartItem.product)) {
            const orderItemData = {
                product: {id: cartItem.product.id},
                order: order,
                price: Number(cartItem.product.price),
                quantity: cartItem.quantity,
            };
            await createOrderItemMutation.mutateAsync(orderItemData);
        }
        
      }

      setSubmitted(true);
      toast.success("Success!")
      navigate(`/user/order/${order.id}`)
    } catch (error) {
      toast.error('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthOnly>
        <Card className="max-w-lg mx-auto mt-10 mb-10">
            <form onSubmit={handleSubmit}>
                <CardBody>
                <div className="mb-4">
                    <Typography variant="h6">Cart Items</Typography>
                        <CartList/>
                    <Typography variant="h5" className="text-right mt-4">Total: ${totalPrice}</Typography>
                </div>
                <div className="mb-4">
                    <Typography variant="h6">Payment Method</Typography>
                    <div className="flex items-center mt-2">
                    <Radio
                                    id="credit_card"
                                    name="payment_method"
                                    label="Credit Card"
                                    icon={<CreditCardIcon className="h-5 w-5" />}
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={() => setPaymentMethod('credit_card')} crossOrigin={undefined}              />
                    <Radio
                                    id="paypal"
                                    name="payment_method"
                                    label="PayPal"
                                    icon={<CheckCircleIcon className="h-5 w-5" />}
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')} crossOrigin={undefined}              />
                    </div>
                </div>
                </CardBody>
                <CardFooter className="flex justify-center">
                <Button type="submit" color="blue" disabled={!totalPrice}>
                    {loading ? <Spinner className="h-4 w-4" /> : 'Submit Order'}
                </Button>
                </CardFooter>
            </form>
            <Toaster/>
            </Card>
    </AuthOnly>
    
  );
};

export default OrderFormPage;
