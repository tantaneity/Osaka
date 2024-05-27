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
export const useCreateProduct = (inputProduct: ProductCreate) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-product'],
        mutationFn: () => ProductService.createProduct(inputProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        }
    })
}