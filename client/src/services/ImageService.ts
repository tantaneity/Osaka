import { Image, ImageCreate, ImageUpdate } from "@/types/products/Image";
import { api } from "@/api";

class ImageService {
    private ROUTE_PREFIX = 'api/images';

    async getImages(): Promise<Image[]> {
        const images = (await api.get<Image[]>(this.ROUTE_PREFIX)).data;
        return images;
    }

    async getImageById(imageId: string): Promise<Image> {
        const image = (await api.get<Image>(`${this.ROUTE_PREFIX}/${imageId}`)).data;
        return image;
    }

    async createImage(imageData: ImageCreate): Promise<Image> {
        const image = (await api.post<Image>(this.ROUTE_PREFIX, imageData)).data;
        return image;
    }

    async updateImage(imageId: string, imageData: Partial<ImageUpdate>): Promise<Image> {
        const image = (await api.put<Image>(`${this.ROUTE_PREFIX}/${imageId}`, imageData)).data;
        return image;
    }

    async deleteImage(imageId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${imageId}`);
    }

    async getImagesByProductId(productId: string): Promise<Image[]> {
        const images = (await api.get<Image[]>(`${this.ROUTE_PREFIX}/product/${productId}`)).data;
        return images;
    }
}

export default new ImageService();
