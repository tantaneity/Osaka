import { Router, Request, Response, NextFunction } from 'express'
import { CategoryController } from '../controllers/products/CategoryController'
import { CategoryService } from '../services/CategoryService'
import { PgCategoryRepository } from '../models/database/products/PgCategoryRepository'


const categoryRepository = new PgCategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)
const CategoryRouter = Router()

CategoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getAllCategories(req, res, next)
})

CategoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getCategoryById(req, res, next)
})

CategoryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.createCategory(req, res, next)
})

CategoryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.updateCategory(req, res, next)
})

CategoryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.deleteCategory(req, res, next)
})

CategoryRouter.get('/:id/subcategories', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getSubcategories(req, res, next)
})

export default CategoryRouter
