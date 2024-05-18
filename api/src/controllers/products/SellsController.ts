import { NextFunction, Request, Response } from 'express';
import { SellsService } from '../../services/SellsService';
import { ApiError } from '../../errors/api/ApiError';
import Sells from '../../models/common/products/Sells';


export class SellsController {
    constructor(private readonly sellsService: SellsService) {}

    async getSellsById(req: Request, res: Response, next: NextFunction) {
        try {
            const sellsId = req.params.id as string;
            const sells = await this.sellsService.getSellsById(sellsId);
            if (!sells) {
                return next(ApiError.notFound('Sells not found'));
            }
            res.json(sells);
        } catch (error) {
            next(error);
        }
    }

    async createSells(req: Request, res: Response, next: NextFunction) {
        try {
            const sellsData: Sells = req.body;
            const sells = await this.sellsService.createSells(sellsData);
            res.json(sells);
        } catch (error) {
            next(error);
        }
    }

    async updateSells(req: Request, res: Response, next: NextFunction) {
        try {
            const sellsId = req.params.id as string;
            const sellsData: Partial<Sells> = req.body;
            const updatedSells = await this.sellsService.updateSells(sellsId, sellsData);
            if (!updatedSells) {
                return next(ApiError.notFound('Sells not found'));
            }
            res.json(updatedSells);
        } catch (error) {
            next(error);
        }
    }

    async deleteSells(req: Request, res: Response, next: NextFunction) {
        try {
            const sellsId = req.params.id as string;
            const result = await this.sellsService.deleteSells(sellsId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllSells(req: Request, res: Response, next: NextFunction) {
        try {
            const sells = await this.sellsService.getAllSells();
            res.json(sells);
        } catch (error) {
            next(error);
        }
    }

    async getSellsByProductId(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string;
            const sells = await this.sellsService.getSellsByProductId(productId);
            res.json(sells);
        } catch (error) {
            next(error);
        }
    }
}
