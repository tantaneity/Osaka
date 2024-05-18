
import Product from '../common/products/Product'
import { ProductCreateDto, ProductUpdateDto } from '../dtos/product/ProductDto'
import { ProductEntity } from '../entities/ProductEntity'
import { ImageMapper } from './ImageMapper'
import { ReviewMapper } from './ReviewMapper'
import { CategoryMapper } from './CategoryMapper'

export class ProductMapper {
    static fromProductEntityToProduct(entity: ProductEntity): Product {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            quantity: entity.quantity,
            images: entity.images ? entity.images.map(imageEntity => ImageMapper.fromImageEntityToImage(imageEntity)) : [],
            categories: entity.categories ? entity.categories.map(ent => CategoryMapper.fromCategoryEntityToCategory(ent)): [],
            reviews: entity.reviews ? entity.reviews.map(entity => ReviewMapper.ReviewToReviewEntity(entity)) : [],
            dateAdded: entity.dateAdded,
            dateModified: entity.dateModified
        }
    }

    static toProductCreateDto(product: Product): ProductCreateDto {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            categories: product.categories,
            quantity: product.quantity
        }
    }

    static toProductUpdateDto(product: Product): ProductUpdateDto {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            categories: product.categories,
            quantity: product.quantity
        }
    }
}
