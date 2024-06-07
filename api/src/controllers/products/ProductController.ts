import { NextFunction, Request, Response } from 'express'
import { ProductService } from '../../services/ProductService'
import Product from '../../models/common/products/Product'
import { ApiError } from '../../errors/api/ApiError'
import { ProductCreateDto, ProductUpdateDto } from '../../models/dtos/product/ProductDto'
import { CategoryService } from '../../services/CategoryService'
import { PgCategoryRepository } from '../../models/database/products/PgCategoryRepository'
import { SearchProductsParams } from '../../utils/data/Params'

export class ProductController {
    private readonly categoryService: CategoryService
    constructor(private readonly productService: ProductService) {
        const categoryRepository = new PgCategoryRepository()
        this.categoryService = new CategoryService(categoryRepository)
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id as string

            const product = await this.productService.getProductById(productId)
            if (!product) {
                return next(ApiError.notFound('Product not found'))
            }
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productData: Product = req.body

            const product = await this.productService.createProduct(productData)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id as string
            const productData: Partial<ProductUpdateDto> = req.body
            const updatedProduct = await this.productService.updateProduct(productId, productData)
            if (!updatedProduct) {
                return next(ApiError.notFound('Product not found'))
            }
            res.json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id as string
            const result = await this.productService.deleteProduct(productId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.getAllProducts()
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(req.params.categoryId)
            const products = await this.productService.getProductsByCategory(categoryId)
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    async getProductsByPriceRange(req: Request, res: Response, next: NextFunction) {
        try {
            const minPrice = parseFloat(req.query.minPrice as string)
            const maxPrice = parseFloat(req.query.maxPrice as string)
            const products = await this.productService.getProductsByPriceRange(minPrice, maxPrice)
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    async searchProductsByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.query.name as string
            const products = await this.productService.searchProductsByName(name)
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    async searchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const params: SearchProductsParams = {
                name: req.query.name as string,
                categoryName: req.query.categoryName as string,
                minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
                maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
            };

            const products = await this.productService.searchProducts(params);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
}
