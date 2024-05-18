import Image from "../common/products/Image"
import { ImageEntity } from "../entities/ImageEntity"
import { ProductMapper } from "./ProductMapper"

export class ImageMapper {

    static fromImageEntityToImage(entity: ImageEntity): Image {
        return {
            id: entity.id,
            product: ProductMapper.fromProductEntityToProduct(entity.product),
            data: entity.data,
            createdAt: entity.createdAt
        }
    }
}