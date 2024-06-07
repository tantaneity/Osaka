import NewsService from '@/services/NewsService';
import { News } from '@/types/admin/News';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetNews = () =>  useQuery({
    queryKey: ['news'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => NewsService.getNews()
});

export const useCreateNews = (inputNews: News) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-news'],
        mutationFn: () => NewsService.createNews(inputNews),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["news"]});
        }
    });
};

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-news'],
        mutationFn: (params: { newsId: string, newsData: Partial<News> }) => NewsService.updateNews(params.newsId, params.newsData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["news"]});
        }
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-news'],
        mutationFn: (newsId: string) => NewsService.deleteNews(newsId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["news"]});
        }
    });
};
