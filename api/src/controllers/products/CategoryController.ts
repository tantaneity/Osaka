import { NextFunction, Request, Response } from 'express'
import { CategoryService } from '../../services/CategoryService'
import Category from '../../models/common/products/Category'
import { ApiError } from '../../errors/api/ApiError'

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.id)
            if (isNaN(categoryId)) {
                return next(ApiError.badRequest('Invalid category ID'))
            }
            const category = await this.categoryService.getCategoryById(categoryId)
            if (!category) {
                return next(ApiError.notFound('Category not found'))
            }
            res.json(category)
        } catch (error) {
            next(error)
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryData: Category = req.body
            const category = await this.categoryService.createCategory(categoryData)
            res.json(category)
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.id)
            const categoryData: Partial<Category> = req.body
            const updatedCategory = await this.categoryService.updateCategory(categoryId, categoryData)
            if (!updatedCategory) {
                return next(ApiError.notFound('Category not found'))
            }
            res.json(updatedCategory)
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.id)
            const result = await this.categoryService.deleteCategory(categoryId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getAllCategories()
            res.json(categories)
        } catch (error) {
            next(error)
        }
    }

    async getSubcategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.id)
            const subcategories = await this.categoryService.getSubcategories(categoryId)
            res.json(subcategories)
        } catch (error) {
            next(error)
        }
    }
}
