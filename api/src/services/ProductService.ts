import { IProductRepository } from '../repositories/IProductRepository'
import Product from '../models/common/products/Product'
import { ApiError } from '../errors/api/ApiError'
import { ProductCreateDto, ProductUpdateDto } from '../models/dtos/product/ProductDto'

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async getProductById(productId: string): Promise<Product | null> {
        const product = await this.productRepository.getProductById(productId)
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        return product
    }

    async createProduct(productData: Product): Promise<Product> {
        return await this.productRepository.createProduct(productData)
    }

    async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
        return this.productRepository.getProductsByCategory(categoryId)
    }

    async updateProduct(productId: string, productData: Partial<ProductUpdateDto>): Promise<Product | null> {
        const product = await this.productRepository.getProductById(productId)
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        return await this.productRepository.updateProduct(productId, productData)
    }

    async deleteProduct(productId: string): Promise<boolean> {
        const product = await this.productRepository.getProductById(productId)
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        return await this.productRepository.deleteProduct(productId)
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts()
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        return await this.productRepository.getProductsByCategory(categoryId)
    }

    async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
        return await this.productRepository.getProductsByPriceRange(minPrice, maxPrice)
    }

    async searchProductsByName(name: string): Promise<Product[]> {
        return await this.productRepository.searchProductsByName(name)
    }
}
