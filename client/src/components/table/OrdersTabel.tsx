import { useGetOrdersByUserId } from "@/hooks/useOrders";
import useUserStore from "@/store/UserStore";
import { Card, Typography } from "@material-tailwind/react";
import { format } from 'date-fns';

export function OrderTable() {
    const {user} = useUserStore()
    const { data: orders, isLoading, isError } = useGetOrdersByUserId(user?.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders</div>;

  if (!orders || orders.length === 0) {
    return <div>No orders available</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll p-2 md:p-5">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  ID
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4 hidden md:table-cell">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  STATUS
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4 hidden sm:table-cell">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  ORDERED AT
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4 hidden lg:table-cell">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  TOTAL
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  DETAILS
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-2 md:p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.id}
                  </Typography>
                </td>
                <td className="p-2 md:p-4 hidden md:table-cell">
                  <Typography variant="small" className="font-normal" style={{ color: order.orderStatus.color }}>
                    {order.orderStatus.status_name}
                  </Typography>
                </td>
                <td className="p-2 md:p-4 hidden sm:table-cell">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
                  </Typography>
                </td>
                <td className="p-2 md:p-4 hidden lg:table-cell">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    ${order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </Typography>
                </td>
                <td className="p-2 md:p-4">
                  <button>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      View
                    </Typography>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
