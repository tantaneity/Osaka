export interface SearchProductsParams {
    name?: string;
    categoryName?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
}