import Category from '../common/products/Category'
import { CategoryEntity } from '../entities/CategoryEntity'

export class CategoryMapper {
    static fromCategoryEntityToCategory(entity: CategoryEntity): Category {
        return {
            id: entity.id,
            name: entity.name,
            image: entity.image,
            base64Url: entity.base64Url,
            description: entity.description,
            parentCategory: entity.parentCategory
        }
    }
}