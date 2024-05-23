import PageService from '@/services/PageService'
import { Page } from '@/types/admin/Page'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetPages = () =>  useQuery({
    queryKey: ['pages'],
    staleTime: 1000 * 60 * 5,
    
    queryFn: () => PageService.getPages()
})

export const useCreatePage = (inputPage: Page) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-page'],
        mutationFn: () => PageService.createPage(inputPage),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pages"]});
        }
    })
}

export const useUpdatePage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-page'],
        mutationFn: (params: { pageId: string, pageData: Partial<Page> }) => PageService.updatePage(params.pageId, params.pageData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pages"]});
        }
    })
}


export const useDeletePage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-page'],
        mutationFn: (pageId: string) => PageService.deletePage(pageId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pages"]});
        }
    })
}
