import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CategoryService from '@/services/CategoryService';
import { Category } from '@/types/category/Category';

export const useGetAllCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAllCategories(),
});

export const useGetCategoryById = (categoryId: string | undefined | null) => useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => CategoryService.getCategoryById(categoryId || ''),
    enabled: !!categoryId,
});

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-category'],
        mutationFn: (categoryData: Partial<Category>) => CategoryService.createCategory(categoryData as Category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-category'],
        mutationFn: ({ categoryId, categoryData }: { categoryId: string, categoryData: Partial<Category> }) => CategoryService.updateCategory(categoryId, categoryData),
        onSuccess: (_, { categoryId }) => {
            queryClient.invalidateQueries({ queryKey: ['category', categoryId] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: (categoryId: string) => CategoryService.deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });
};

export const useGetSubcategories = (categoryId: string | undefined | null) => useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => CategoryService.getSubcategories(categoryId || ''),
    enabled: !!categoryId,
});
