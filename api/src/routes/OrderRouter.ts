import { Router } from 'express';
import { OrderController } from '../controllers/shopping/OrderController';
import { OrderItemController } from '../controllers/shopping/OrderItemController';
import { OrderService } from '../services/OrderService';
import { OrderItemService } from '../services/OrderItemService';
import { PgOrderRepository } from '../models/database/shopping/PgOrderRepository';
import { PgOrderItemRepository } from '../models/database/shopping/PgOrderItemRepository';


const orderRepository = new PgOrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const orderItemRepository = new PgOrderItemRepository();
const orderItemService = new OrderItemService(orderItemRepository);
const orderItemController = new OrderItemController(orderItemService);

const OrderRouter = Router();

OrderRouter.get('/', async (req, res, next) => {
    await orderController.getAllOrders(req, res, next);
});

OrderRouter.get('/:id', async (req, res, next) => {
    await orderController.getOrderById(req, res, next);
});

OrderRouter.post('/', async (req, res, next) => {
    await orderController.createOrder(req, res, next);
});

OrderRouter.put('/:id', async (req, res, next) => {
    await orderController.updateOrder(req, res, next);
});

OrderRouter.delete('/:id', async (req, res, next) => {
    await orderController.deleteOrder(req, res, next);
});

OrderRouter.get('/:orderId/items', async (req, res, next) => {
    await orderItemController.getAllOrderItems(req, res, next);
});

OrderRouter.get('/:orderId/items/:id', async (req, res, next) => {
    await orderItemController.getOrderItemById(req, res, next);
});

OrderRouter.post('/:orderId/items', async (req, res, next) => {
    await orderItemController.createOrderItem(req, res, next);
});

OrderRouter.put('/:orderId/items/:id', async (req, res, next) => {
    await orderItemController.updateOrderItem(req, res, next);
});

OrderRouter.delete('/:orderId/items/:id', async (req, res, next) => {
    await orderItemController.deleteOrderItem(req, res, next);
});
OrderRouter.get('/statuses', async (req, res, next) => {
    await orderController.getAllOrderStatuses(req, res, next);
});

OrderRouter.get('/statuses/:id', async (req, res, next) => {
    await orderController.getOrderStatusById(req, res, next);
});

OrderRouter.post('/statuses', async (req, res, next) => {
    await orderController.createOrderStatus(req, res, next);
});

OrderRouter.put('/statuses/:id', async (req, res, next) => {
    await orderController.updateOrderStatus(req, res, next);
});

OrderRouter.delete('/statuses/:id', async (req, res, next) => {
    await orderController.deleteOrderStatus(req, res, next);
});

export default OrderRouter;
