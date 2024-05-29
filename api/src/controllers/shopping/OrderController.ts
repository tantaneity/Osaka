import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../services/OrderService';
import Order from '../../models/common/shopping/orders/Order';
import OrderStatus from '../../models/common/shopping/orders/OrderStatus';
import { ApiError } from '../../errors/api/ApiError';


export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id as string;
            const order = await this.orderService.getOrderById(orderId);
            if (!order) {
                return next(ApiError.notFound('Order not found'));
            }
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderData: Order = req.body;
            const order = await this.orderService.createOrder(orderData);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id as string;
            const orderData: Partial<Order> = req.body;
            const updatedOrder = await this.orderService.updateOrder(orderId, orderData);
            if (!updatedOrder) {
                return next(ApiError.notFound('Order not found'));
            }
            res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id as string;
            const result = await this.orderService.deleteOrder(orderId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    async getOrderStatusById(req: Request, res: Response, next: NextFunction) {
        try {
            const statusId = parseInt(req.params.id);
            const status = await this.orderService.getOrderStatusById(statusId);
            if (!status) {
                return next(ApiError.notFound('Order status not found'));
            }
            res.json(status);
        } catch (error) {
            next(error);
        }
    }

    async createOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const statusData: OrderStatus = req.body;
            const status = await this.orderService.createOrderStatus(statusData);
            res.json(status);
        } catch (error) {
            next(error);
        }
    }

    async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const statusId = parseInt(req.params.id);
            const statusData: Partial<OrderStatus> = req.body;
            const updatedStatus = await this.orderService.updateOrderStatus(statusId, statusData);
            if (!updatedStatus) {
                return next(ApiError.notFound('Order status not found'));
            }
            res.json(updatedStatus);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const statusId = parseInt(req.params.id);
            const result = await this.orderService.deleteOrderStatus(statusId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllOrderStatuses(req: Request, res: Response, next: NextFunction) {
        try {
            const statuses = await this.orderService.getAllOrderStatuses();
            res.json(statuses);
        } catch (error) {
            next(error);
        }
    }

    async getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const orders = await this.orderService.getOrdersByUserId(userId);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
}
