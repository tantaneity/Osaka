import HomePageBanner from "../models/common/admin/banner/Banner"

export interface IHomePageBannerRepository {
    getBannerById(bannerId: number): Promise<HomePageBanner | null>
    createBanner(bannerData: HomePageBanner): Promise<HomePageBanner>
    updateBanner(bannerId: number, bannerData: Partial<HomePageBanner>): Promise<HomePageBanner | null>
    deleteBanner(bannerId: number): Promise<boolean>
    getAllBanners(): Promise<HomePageBanner[]>
    searchBannersByImage(imageBuffer: Buffer): Promise<HomePageBanner[]>
}
