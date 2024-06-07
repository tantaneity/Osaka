import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SellsService from '@/services/SellsService';
import { Sells } from '@/types/shop/sells/Sells';

export const useGetAllSells = () => useQuery({
    queryKey: ['sells'],
    queryFn: () => SellsService.getAllSells(),
});

export const useGetSellsById = (sellsId: string | undefined | null) => useQuery({
    queryKey: ['sells', sellsId],
    queryFn: () => SellsService.getSellsById(sellsId || ''),
    enabled: !!sellsId,
});

export const useGetSellsByProductId = (productId: string | undefined | null) => useQuery({
    queryKey: ['sells-by-product', productId],
    queryFn: () => SellsService.getSellsByProductId(productId || ''),
    enabled: !!productId,
});

export const useCreateSells = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-sells'],
        mutationFn: (sellsData: Partial<Sells>) => SellsService.createSells(sellsData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sells'] });
        }
    });
};

export const useUpdateSells = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-sells'],
        mutationFn: ({ sellsId, sellsData }: { sellsId: string, sellsData: Partial<Sells> }) => SellsService.updateSells(sellsId, sellsData),
        onSuccess: (_, { sellsId }) => {
            queryClient.invalidateQueries({ queryKey: ['sells', sellsId] });
        }
    });
};

export const useDeleteSells = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-sells'],
        mutationFn: (sellsId: string) => SellsService.deleteSells(sellsId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sells'] });
        }
    });
};
