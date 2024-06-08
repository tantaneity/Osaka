import { NextFunction, Request, Response } from 'express';
import { ImageService } from '../../services/ImageService';
import { ApiError } from '../../errors/api/ApiError';
import Image from '../../models/common/products/Image';

export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    async getImageById(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = req.params.id as string;

            const image = await this.imageService.getImageById(imageId);
            if (!image) {
                return next(ApiError.notFound('Image not found'));
            }
            res.json(image);
        } catch (error) {
            next(error);
        }
    }

    async createImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageData: Partial<Image> = req.body;

            const image = await this.imageService.createImage(imageData);
            res.json(image);
        } catch (error) {
            next(error);
        }
    }

    async updateImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = req.params.id as string;
            const imageData: Partial<Image> = req.body;

            const updatedImage = await this.imageService.updateImage(imageId, imageData);
            if (!updatedImage) {
                return next(ApiError.notFound('Image not found'));
            }
            res.json(updatedImage);
        } catch (error) {
            next(error);
        }
    }

    async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = req.params.id as string;

            const result = await this.imageService.deleteImage(imageId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllImages(req: Request, res: Response, next: NextFunction) {
        try {
            const images = await this.imageService.getAllImages();
            res.json(images);
        } catch (error) {
            next(error);
        }
    }

    async getImagesByProductId(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string;

            const images = await this.imageService.getImagesByProductId(productId);
            res.json(images);
        } catch (error) {
            next(error);
        }
    }
}
