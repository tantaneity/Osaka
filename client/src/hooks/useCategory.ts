import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CategoryService from '@/services/CategoryService';
import { Category } from '@/types/category/Category';

export const useGetAllCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAllCategories(),
});

export const useGetCategoryById = (categoryId: number | undefined | null) => useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => CategoryService.getCategoryById(categoryId || 0),
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
        mutationFn: ({ categoryId, categoryData }: { categoryId: number, categoryData: Partial<Category> }) => CategoryService.updateCategory(categoryId, categoryData),
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
        mutationFn: (categoryId: number) => CategoryService.deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });
};

export const useGetSubcategories = (categoryId: number | undefined | null) => useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => CategoryService.getSubcategories(categoryId || 0),
    enabled: !!categoryId,
});

