import HomePageBannerService from '@/services/HomePageBannerService'
import { HomePageBanner } from '@/types/admin/HomePageBanner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetBanners = () =>  useQuery({
    queryKey: ['banners'],
    staleTime: 1000 * 60 * 5,
    
    queryFn: () => HomePageBannerService.getBanners()
})

export const useCreateBanner = (inputBanner: HomePageBanner) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-banner'],
        mutationFn: () => HomePageBannerService.createBanner(inputBanner),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["banners"]});
        }
    })
}

export const useUpdateBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-banner'],
        mutationFn: (params: { bannerId: string, bannerData: Partial<HomePageBanner> }) => HomePageBannerService.updateBanner(params.bannerId, params.bannerData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["banners"]});
        }
    })
}


export const useDeleteBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-banner'],
        mutationFn: (bannerId: string) => HomePageBannerService.deleteBanner(bannerId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["banners"]});
        }
    })
}
