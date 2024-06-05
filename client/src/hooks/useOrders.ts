import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrderService from '@/services/OrderService';
import { Order, OrderCreate } from '@/types/shop/order/Order';
import { OrderStatus } from '@/types/shop/order/OrderStatus';
import { CreateOrderItem, OrderItem } from '@/types/shop/order/OrderItem';

export const useGetAllOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getAllOrders(),
});

export const useGetOrderById = (orderId: string | undefined | null) => useQuery({
    queryKey: ['order', orderId],
    queryFn: () => OrderService.getOrderById(orderId || ''),
    enabled: !!orderId,
});

export const useGetOrdersByUserId = (userId: string | undefined | null) => useQuery({
    queryKey: ['orders', userId],
    queryFn: () => OrderService.getOrdersByUserId(userId || ''),
    enabled: !!userId,
});


export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-order'],
        mutationFn: (orderData: OrderCreate) => OrderService.createOrder(orderData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-order'],
        mutationFn: ({ orderId, orderData }: { orderId: string, orderData: Partial<Order> }) => OrderService.updateOrder(orderId, orderData),
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
        }
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-order'],
        mutationFn: (orderId: string) => OrderService.deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};

export const useGetAllOrderStatuses = () => useQuery({
    queryKey: ['order-statuses'],
    queryFn: () => OrderService.getAllOrderStatuses(),
});

export const useGetOrderStatusById = (statusId: number | undefined | null) => useQuery({
    queryKey: ['order-status', statusId],
    queryFn: () => OrderService.getOrderStatusById(statusId || 0),
    enabled: !!statusId,
});

export const useCreateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-order-status'],
        mutationFn: (statusData: OrderStatus) => OrderService.createOrderStatus(statusData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-statuses'] });
        }
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-order-status'],
        mutationFn: ({ statusId, statusData }: { statusId: number, statusData: Partial<OrderStatus> }) => OrderService.updateOrderStatus(statusId, statusData),
        onSuccess: (_, { statusId }) => {
            queryClient.invalidateQueries({ queryKey: ['order-status', statusId] });
        }
    });
};

export const useDeleteOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-order-status'],
        mutationFn: (statusId: number) => OrderService.deleteOrderStatus(statusId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-statuses'] });
        }
    });
};


export const useGetOrderItemsByOrderId = (orderId: string | undefined | null) => useQuery({
    queryKey: ['order-items', orderId],
    queryFn: () => OrderService.getOrderItemsByOrderId(orderId || ''),
    enabled: !!orderId,
});

export const useGetOrderItemById = (orderItemId: string | undefined | null) => useQuery({
    queryKey: ['order-item', orderItemId],
    queryFn: () => OrderService.getOrderItemById(orderItemId || ''),
    enabled: !!orderItemId,
});

export const useCreateOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-order-item'],
        mutationFn: (orderItemData: Partial<CreateOrderItem>) => OrderService.createOrderItem(orderItemData.order?.id || "", orderItemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-items'] });
        }
    });
};

export const useUpdateOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-order-item'],
        mutationFn: ({ orderItemId, orderItemData }: { orderItemId: string, orderItemData: Partial<OrderItem> }) => OrderService.updateOrderItem(orderItemId, orderItemData),
        onSuccess: (_, { orderItemId }) => {
            queryClient.invalidateQueries({ queryKey: ['order-item', orderItemId] });
        }
    });
};

export const useDeleteOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-order-item'],
        mutationFn: (orderItemId: string) => OrderService.deleteOrderItem(orderItemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-items'] });
        }
    });
};