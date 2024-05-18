import { Router, Request, Response, NextFunction } from 'express'
import { ProductController } from '../controllers/products/ProductController'
import { ProductService } from '../services/ProductService'
import { PgProductRepository } from '../models/database/products/PgProductRepository'

const productRepository = new PgProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)
const ProductRouter = Router()

ProductRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getAllProducts(req, res, next)
})

ProductRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getProductById(req, res, next)
})

ProductRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.createProduct(req, res, next)
})

ProductRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.updateProduct(req, res, next)
})

ProductRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.deleteProduct(req, res, next)
})


ProductRouter.get('/category/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = parseInt(req.params.categoryId)
    if (isNaN(categoryId)) {
        return res.status(400).json({ message: 'Invalid category ID' })
    }

    try {
        const products = await productService.getProductsByCategoryId(categoryId)
        res.json(products)
    } catch (error) {
        next(error)
    }
})

ProductRouter.get('/search/price', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getProductsByPriceRange(req, res, next)
})

ProductRouter.get('/search/name', async (req: Request, res: Response, next: NextFunction) => {
    await productController.searchProductsByName(req, res, next)
})


export default ProductRouter
