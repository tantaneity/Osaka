import { api } from "@/api"
import { HomePageBanner } from "@/types/admin/HomePageBanner"

class HomePageBannerService {
    private ROUTE_PREFIX = 'api/banners'

    async getBanners(): Promise<HomePageBanner[]> {
        const banners = (await api.get<HomePageBanner[]>(this.ROUTE_PREFIX)).data
        return banners
    }

    async getBannerById(bannerId: string): Promise<HomePageBanner> {
        const banner = (await api.get<HomePageBanner>(`${this.ROUTE_PREFIX}/${bannerId}`)).data
        return banner
    }

    async createBanner(bannerData: HomePageBanner): Promise<HomePageBanner> {
        const banner = (await api.post<HomePageBanner>(this.ROUTE_PREFIX, bannerData)).data
        return banner
    }

    async updateBanner(bannerId: string, bannerData: Partial<HomePageBanner>): Promise<HomePageBanner> {
        const banner = (await api.put<HomePageBanner>(`${this.ROUTE_PREFIX}/${bannerId}`, bannerData)).data
        return banner
    }

    async deleteBanner(bannerId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${bannerId}`)
    }

    async searchBannersByImage(imageBuffer: Buffer): Promise<HomePageBanner[]> {
        const formData = new FormData()
        formData.append('image', new Blob([imageBuffer]), 'image.png')

        const banners = (await api.post<HomePageBanner[]>(`${this.ROUTE_PREFIX}/search`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data
        return banners
    }
}

export default new HomePageBannerService()
