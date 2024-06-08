import { Router, Request, Response, NextFunction } from 'express';
import { ImageService } from '../services/ImageService';
import { PgImageRepository } from '../models/database/products/PgImageRepository';
import { ImageController } from '../controllers/products/ImageController';

const imageRepository = new PgImageRepository();
const imageService = new ImageService(imageRepository);
const imageController = new ImageController(imageService);
const ImageRouter = Router();

ImageRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await imageController.getAllImages(req, res, next);
});

ImageRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await imageController.getImageById(req, res, next);
});

ImageRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await imageController.createImage(req, res, next);
});

ImageRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await imageController.updateImage(req, res, next);
});

ImageRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await imageController.deleteImage(req, res, next);
});

ImageRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const images = await imageController.getImagesByProductId(req, res, next);
        res.json(images);
    } catch (error) {
        next(error);
    }
});

export default ImageRouter;
