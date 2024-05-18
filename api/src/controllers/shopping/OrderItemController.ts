import { Request, Response, NextFunction } from 'express';
import { OrderItemService } from '../../services/OrderItemService';
import OrderItem from '../../models/common/shopping/orders/OrderItem';
import { ApiError } from '../../errors/api/ApiError';
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    async getOrderItemById(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItemId = req.params.id as string;
            const orderItem = await this.orderItemService.getOrderItemById(orderItemId);
            if (!orderItem) {
                return next(ApiError.notFound('Order item not found'));
            }
            res.json(orderItem);
        } catch (error) {
            next(error);
        }
    }

    async createOrderItem(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItemData: OrderItem = req.body;
            const createdOrderItem = await this.orderItemService.createOrderItem(orderItemData);
            res.json(createdOrderItem);
        } catch (error) {
            next(error);
        }
    }

    async updateOrderItem(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItemId = req.params.id as string;
            const orderItemData: Partial<OrderItem> = req.body;
            const updatedOrderItem = await this.orderItemService.updateOrderItem(orderItemId, orderItemData);
            if (!updatedOrderItem) {
                return next(ApiError.notFound('Order item not found'));
            }
            res.json(updatedOrderItem);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrderItem(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItemId = req.params.id as string;
            const result = await this.orderItemService.deleteOrderItem(orderItemId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllOrderItems(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItems = await this.orderItemService.getAllOrderItems();
            res.json(orderItems);
        } catch (error) {
            next(error);
        }
    }
}
