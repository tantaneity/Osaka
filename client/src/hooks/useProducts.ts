import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ProductService from '@/services/ProductService';
import { ProductCreate } from '@/types/products/ProductCreate';

export const useGetProducts = () =>  useQuery({
    queryKey: ['products'],
    staleTime: 1000 * 60 * 5,
    
    queryFn: () => ProductService.getProducts()
})
export const useGetProductById = (productId: string | undefined | null) => useQuery({
    queryKey: ['product-by-id', productId],
    queryFn: () => ProductService.getProductById(productId || ''),
    enabled: !!productId,
})
export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-product'],
        mutationFn: (inputProduct: ProductCreate) => ProductService.createProduct(inputProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        }
    })
}

export const useSearchProducts = (params: { name?: string; categoryName?: string; minPrice?: number; maxPrice?: number; limit?: number; offset?: number }) => useQuery({
    queryKey: ['search-products', params],
    queryFn: () => ProductService.searchProducts(params),
    enabled: Object.keys(params).length > 0,
});

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-product'],
        mutationFn: (productId: string) => ProductService.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
}
