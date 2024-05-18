import { Router, Request, Response, NextFunction } from 'express';
import { SellsController } from '../controllers/products/SellsController';
import { SellsService } from '../services/SellsService';
import { PgSellsRepository } from '../models/database/products/PgSellsRepository';
const sellsRepository = new PgSellsRepository();
const sellsService = new SellsService(sellsRepository);
const sellsController = new SellsController(sellsService);
const SellsRouter = Router();

SellsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.getAllSells(req, res, next);
});

SellsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.getSellsById(req, res, next);
});

SellsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.createSells(req, res, next);
});

SellsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.updateSells(req, res, next);
});

SellsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.deleteSells(req, res, next);
});

SellsRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
    await sellsController.getSellsByProductId(req, res, next);
});

export default SellsRouter;
