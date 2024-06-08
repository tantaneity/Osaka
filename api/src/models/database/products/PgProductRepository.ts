import { Repository, Like, Between, ILike } from 'typeorm'
import { ApiError } from '../../../errors/api/ApiError'
import { AppDataSource } from '../../../config/data-source'
import { IProductRepository } from '../../../repositories/IProductRepository'
import { ProductEntity } from '../../entities/ProductEntity'
import Product from '../../common/products/Product'
import { ProductMapper } from '../../mappers/ProductMapper'
import { ProductCreateDto, ProductUpdateDto } from '../../dtos/product/ProductDto'
import Category from '../../common/products/Category'
import { SearchProductsParams } from '../../../utils/data/Params'




export class PgProductRepository implements IProductRepository {
    
    private readonly productRepository: Repository<ProductEntity>

    constructor() {
        this.productRepository = AppDataSource.getRepository(ProductEntity)
    }

    async getProductById(productId: string): Promise<Product | null> {
        const product = await this.productRepository.findOne({ where : { id: productId }, relations: ['images', 'categories', 'reviews', 'reviews.user', 'reviews.product', 'images.product']})
        return product ? ProductMapper.fromProductEntityToProduct(product) : null
    }

    async createProduct(productData: ProductCreateDto): Promise<Product> {
        const newProduct = this.productRepository.create(productData)
        const savedProduct = await this.productRepository.save(newProduct)
        return ProductMapper.fromProductEntityToProduct(savedProduct)
    }

    async updateProduct(productId: string, productData: Partial<ProductUpdateDto>): Promise<Product | null> {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } })
            if (!product) throw ApiError.notFound('Product not found')

            Object.assign(product, productData)
            await this.productRepository.save(product)
            return ProductMapper.fromProductEntityToProduct(product)
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to update product', error)
        }
    }

    async deleteProduct(productId: string): Promise<boolean> {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } })
            if (!product) throw ApiError.notFound('Product not found')

            await this.productRepository.remove(product)
            return true
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to delete product', error)
        }
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.find({
            relations: ['images', 'categories', 'reviews', 'reviews.user', 'reviews.product', 'images.product']
        })


        console.log(products.map(product => product.images))
        return products.map(product => ProductMapper.fromProductEntityToProduct(product))
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        const products = await this.productRepository.find({ where: {
            categories: {
                id: categoryId
            }
        }, relations: ['categories', 'images'] })
        return products.map(product => ProductMapper.fromProductEntityToProduct(product))
    }

    async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
        const products = await this.productRepository.find({ where: { price: Between(minPrice, maxPrice) } })
        return products.map(product => ProductMapper.fromProductEntityToProduct(product))
    }

    async searchProductsByName(name: string): Promise<Product[]> {
        const products = await this.productRepository.find({ where: { name: ILike(`%${name}%`) }, relations: ['images', 'categories', 'reviews', 'reviews.user', 'reviews.product', 'images.product'] })
        return products.map(product => ProductMapper.fromProductEntityToProduct(product))
    }
    async searchProducts(params: SearchProductsParams): Promise<Product[]> {
        const { name, categoryName, minPrice, maxPrice, limit, offset } = params;
        const query: any = { 
            relations: ['images', 'categories', 'reviews', 'reviews.user', 'reviews.product', 'images.product'] 
        };
        let whereClause: any = {};
    
        if (name) {
            whereClause.name = ILike(`%${name}%`);
        }
        if (categoryName) {
            whereClause.categories = { name: ILike(`%${categoryName}%`) };
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
            whereClause.price = Between(minPrice, maxPrice);
        }
    
        query.where = whereClause;
    
        query.order = { name: 'ASC' };
    
        const products = await this.productRepository.find({
            ...query,
            take: limit,
            skip: offset,
        });
    
        return products.map(product => ProductMapper.fromProductEntityToProduct(product));
    }
    
    
    
    
    
    
}
