import { api } from "@/api";
import { Category } from "@/types/category/Category";

class CategoryService {
    private ROUTE_PREFIX = 'api/category';

    async getCategoryById(categoryId: number): Promise<Category> {
        const category = (await api.get<Category>(`${this.ROUTE_PREFIX}/${categoryId}`)).data;
        return category;
    }

    async createCategory(categoryData: Category): Promise<Category> {
        const category = (await api.post<Category>(this.ROUTE_PREFIX, categoryData)).data;
        return category;
    }

    async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category> {
        const category = (await api.put<Category>(`${this.ROUTE_PREFIX}/${categoryId}`, categoryData)).data;
        return category;
    }

    async deleteCategory(categoryId: number): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${categoryId}`);
    }

    async getAllCategories(): Promise<Category[]> {
        const categories = (await api.get<Category[]>(this.ROUTE_PREFIX)).data;
        return categories;
    }

    async getSubcategories(categoryId: number): Promise<Category[]> {
        const subcategories = (await api.get<Category[]>(`${this.ROUTE_PREFIX}/${categoryId}/subcategories`)).data;
        return subcategories;
    }
}

export default new CategoryService();   