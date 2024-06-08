import Image from "../models/common/products/Image";

export interface IImageRepository {
    getImageById(imageId: string): Promise<Image | null>;
    createImage(imageData: Partial<Image>): Promise<Image>;
    updateImage(imageId: string, imageData: Partial<Image>): Promise<Image | null>;
    deleteImage(imageId: string): Promise<boolean>;
    getAllImages(): Promise<Image[]>;
    getImagesByProductId(productId: string): Promise<Image[]>;
}