import { IHomePageBannerRepository } from '../repositories/IHomePageBannerRepository'
import { ApiError } from '../errors/api/ApiError'
import HomePageBanner from '../models/common/admin/banner/Banner'

export class HomePageBannerService {
    constructor(private readonly bannerRepository: IHomePageBannerRepository) {}

    async getBannerById(bannerId: number): Promise<HomePageBanner | null> {
        const banner = await this.bannerRepository.getBannerById(bannerId)
        if (!banner) {
            throw ApiError.notFound("HomePageBanner not found")
        }
        return banner
    }

    async createBanner(bannerData: HomePageBanner): Promise<HomePageBanner> {
        return await this.bannerRepository.createBanner(bannerData)
    }

    async updateBanner(bannerId: number, bannerData: Partial<HomePageBanner>): Promise<HomePageBanner | null> {
        const banner = await this.bannerRepository.getBannerById(bannerId)
        if (!banner) {
            throw ApiError.notFound("HomePageBanner not found")
        }
        return await this.bannerRepository.updateBanner(bannerId, bannerData)
    }

    async deleteBanner(bannerId: number): Promise<boolean> {
        const banner = await this.bannerRepository.getBannerById(bannerId)
        if (!banner) {
            throw ApiError.notFound("HomePageBanner not found")
        }
        return await this.bannerRepository.deleteBanner(bannerId)
    }

    async getAllBanners(): Promise<HomePageBanner[]> {
        return await this.bannerRepository.getAllBanners()
    }

    async searchBannersByImage(imageBuffer: Buffer): Promise<HomePageBanner[]> {
        return await this.bannerRepository.searchBannersByImage(imageBuffer)
    }
}
