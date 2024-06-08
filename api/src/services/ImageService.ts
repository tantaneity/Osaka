import { IImageRepository } from '../repositories/IImageRepository';
import { ApiError } from '../errors/api/ApiError';
import Image from '../models/common/products/Image';

export class ImageService {
    constructor(private readonly imageRepository: IImageRepository) {}

    async getImageById(imageId: string): Promise<Image | null> {
        const image = await this.imageRepository.getImageById(imageId);
        if (!image) {
            throw ApiError.notFound("Image not found");
        }
        return image;
    }

    async createImage(imageData: Partial<Image>): Promise<Image> {
        return await this.imageRepository.createImage(imageData);
    }

    async updateImage(imageId: string, imageData: Partial<Image>): Promise<Image | null> {
        const image = await this.imageRepository.getImageById(imageId);
        if (!image) {
            throw ApiError.notFound("Image not found");
        }
        return await this.imageRepository.updateImage(imageId, imageData);
    }

    async deleteImage(imageId: string): Promise<boolean> {
        const image = await this.imageRepository.getImageById(imageId);
        if (!image) {
            throw ApiError.notFound("Image not found");
        }
        return await this.imageRepository.deleteImage(imageId);
    }

    async getAllImages(): Promise<Image[]> {
        return await this.imageRepository.getAllImages();
    }

    async getImagesByProductId(productId: string): Promise<Image[]> {
        return await this.imageRepository.getImagesByProductId(productId);
    }
}
