import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import { ImageEntity } from '../../entities/ImageEntity';
import { ApiError } from '../../../errors/api/ApiError';
import { ImageMapper } from '../../mappers/ImageMapper';
import Image from '../../common/products/Image';

export class PgImageRepository {
    private readonly imageRepository: Repository<ImageEntity>;

    constructor() {
        this.imageRepository = AppDataSource.getRepository(ImageEntity);
    }

    async getImageById(imageId: string): Promise<Image | null> {
        const image = await this.imageRepository.findOne({ where: { id: imageId }, relations: ['product'] });
        return image ? ImageMapper.fromImageEntityToImage(image) : null;
    }

    async createImage(imageData: Partial<ImageEntity>): Promise<Image> {
        const newImageEntity = this.imageRepository.create(imageData);
        const savedImageEntity = await this.imageRepository.save(newImageEntity);
        return ImageMapper.fromImageEntityToImage(savedImageEntity);
    }

    async updateImage(imageId: string, imageData: Partial<Image>): Promise<Image | null> {
        try {
            const imageEntity = await this.imageRepository.findOne({ where: { id: imageId } });
            if (!imageEntity) throw ApiError.notFound('Image not found');

            Object.assign(imageEntity, imageData);
            await this.imageRepository.save(imageEntity);
            return ImageMapper.fromImageEntityToImage(imageEntity);
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to update image', error);
        }
    }

    async deleteImage(imageId: string): Promise<boolean> {
        try {
            const imageEntity = await this.imageRepository.findOne({ where: { id: imageId } });
            if (!imageEntity) throw ApiError.notFound('Image not found');

            await this.imageRepository.remove(imageEntity);
            return true;
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to delete image', error);
        }
    }

    async getAllImages(): Promise<Image[]> {
        const imageEntities = await this.imageRepository.find({ relations: ['product'] });
        return imageEntities.map(ImageMapper.fromImageEntityToImage);
    }

    async getImagesByProductId(productId: string): Promise<Image[]> {
        const imageEntities = await this.imageRepository.find({ where: { product: { id: productId } }, relations: ['product'] });
        return imageEntities.map(ImageMapper.fromImageEntityToImage);
    }
}
