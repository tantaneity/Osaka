import Image from "../common/products/Image"
import { ImageEntity } from "../entities/ImageEntity"
import { ProductMapper } from "./ProductMapper"

export class ImageMapper {

    static fromImageEntityToImage(entity: ImageEntity): Image {
        return {
            id: entity.id,
            product: {id: entity.product.id},
            data: entity.data,
            base64Url: entity.base64Url,
            createdAt: entity.createdAt
        }
    }
}