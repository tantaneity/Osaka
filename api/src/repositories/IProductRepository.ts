import Product from '../models/common/products/Product'
import { ProductCreateDto, ProductUpdateDto } from '../models/dtos/product/ProductDto'
import { SearchProductsParams } from '../utils/data/Params'

export interface IProductRepository {
    getProductById(productId: string): Promise<Product | null>
    createProduct(productData: Product): Promise<Product>
    updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null>
    deleteProduct(productId: string): Promise<boolean>
    getAllProducts(): Promise<Product[]>
    getProductsByCategory(categoryId: number): Promise<Product[]>
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>
    searchProductsByName(name: string): Promise<Product[]>
    searchProducts(params: SearchProductsParams): Promise<Product[]>
}
