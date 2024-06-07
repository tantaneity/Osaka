import { ProductCreate } from "@/types/products/ProductCreate"
import { ProductUpdate } from "@/types/products/ProductUpdate"
import { Product } from "@/types/products/Product"
import { api } from "@/api"

class ProductService {
    private ROUTE_PREFIX = 'api/drinks'

    async getProducts(): Promise<Product[]> {
        const products = (await api.get<Product[]>(this.ROUTE_PREFIX)).data
        return products
    }

    async getProductById(productId: string): Promise<Product> {
        const product = (await api.get<Product>(`${this.ROUTE_PREFIX}/${productId}`)).data
        return product
    }

    async createProduct(productData: ProductCreate): Promise<Product> {
        const product = (await api.post<Product>(this.ROUTE_PREFIX, productData)).data
        return product
    }

    async updateProduct(productId: string, productData: Partial<ProductUpdate>): Promise<Product> {
        const product = (await api.put<Product>(`${this.ROUTE_PREFIX}/${productId}`, productData)).data
        return product
    }

    async deleteProduct(productId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${productId}`)
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        const products = (await api.get<Product[]>(`${this.ROUTE_PREFIX}/category/${categoryId}`)).data
        return products
    }

    async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
        const products = (await api.get<Product[]>(`${this.ROUTE_PREFIX}/price-range`, { params: { minPrice, maxPrice } })).data
        return products
    }

    async searchProductsByName(name: string): Promise<Product[]> {
        const products = (await api.get<Product[]>(`${this.ROUTE_PREFIX}/search`, { params: { name } })).data
        return products
    }

    async searchProducts(params: { name?: string; categoryName?: string; minPrice?: number; maxPrice?: number; limit?: number; offset?: number }): Promise<Product[]> {
        const products = (await api.get<Product[]>(`${this.ROUTE_PREFIX}/search`, { params })).data;
        return products;
    }
}

export default new ProductService()
