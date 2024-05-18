    import { Repository } from 'typeorm'
    import { ApiError } from '../../../errors/api/ApiError'
    import { AppDataSource } from '../../../config/data-source'
    import { ICategoryRepository } from '../../../repositories/ICategoryRepository'
    import { CategoryEntity } from '../../entities/CategoryEntity'
    import Category from '../../common/products/Category'
    import { CategoryMapper } from '../../mappers/CategoryMapper'

    export class PgCategoryRepository implements ICategoryRepository {
        
        private readonly categoryRepository: Repository<CategoryEntity>

        constructor() {
            this.categoryRepository = AppDataSource.getRepository(CategoryEntity)
        }

        async getCategoryById(categoryId: number): Promise<Category | null> {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['parentCategory']  })
            console.log(category)
            return category ? CategoryMapper.fromCategoryEntityToCategory(category) : null
        }

        async createCategory(categoryData: Category): Promise<Category> {
            if (!categoryData){
                throw ApiError.badRequest("Category data is invalid")
            }
            const newCategory = this.categoryRepository.create(categoryData)
            const savedCategory = await this.categoryRepository.save(newCategory)
            return CategoryMapper.fromCategoryEntityToCategory(savedCategory)
        }

        async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null> {
            try {
                const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
                if (!category) throw ApiError.notFound('Category not found')

                Object.assign(category, categoryData)
                await this.categoryRepository.save(category)
                return CategoryMapper.fromCategoryEntityToCategory(category)
            } catch (error: any) {
                throw ApiError.internalServerError('Failed to update category', error)
            }
        }

        async deleteCategory(categoryId: number): Promise<boolean> {
            try {
                const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
                if (!category) throw ApiError.notFound('Category not found')

                await this.categoryRepository.remove(category)
                return true
            } catch (error: any) {
                throw ApiError.internalServerError('Failed to delete category', error)
            }
        }

        async getAllCategories(): Promise<Category[]> {
            const categories = await this.categoryRepository.find({relations: ['parentCategory']})
            return categories.map(category => CategoryMapper.fromCategoryEntityToCategory(category))
        }

        async getSubcategories(categoryId: number): Promise<Category[]> {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['subcategories'] })
            return category?.subcategories ?? []
        }
    }
