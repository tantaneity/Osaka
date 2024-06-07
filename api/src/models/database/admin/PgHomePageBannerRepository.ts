import { Repository } from 'typeorm'
import { HomePageBannerEntity } from '../../entities/HomePageBannerEntity'
import { IHomePageBannerRepository } from '../../../repositories/IHomePageBannerRepository'
import { AppDataSource } from '../../../config/data-source'
import { HomePageBannerMapper } from '../../mappers/HomePageBannerMapper'
import HomePageBanner from '../../common/admin/banner/Banner'

export class PgHomePageBannerRepository implements IHomePageBannerRepository {
    
    private readonly bannerRepository: Repository<HomePageBannerEntity>

    constructor() {
        this.bannerRepository = AppDataSource.getRepository(HomePageBannerEntity)
    }

    async getBannerById(bannerId: number): Promise<HomePageBanner | null> {
        const banner = await this.bannerRepository.findOne({ where: { id: bannerId } })
        return banner ? HomePageBannerMapper.fromEntityToModel(banner) : null
    }

    async createBanner(bannerData: HomePageBanner): Promise<HomePageBanner> {
        const newBanner = this.bannerRepository.create(bannerData)
        const savedBanner = await this.bannerRepository.save(newBanner)
        return HomePageBannerMapper.fromEntityToModel(savedBanner)
    }

    async updateBanner(bannerId: number, bannerData: Partial<HomePageBanner>): Promise<HomePageBanner | null> {
        const banner = await this.bannerRepository.findOne({ where: { id: bannerId } })
        if (!banner) return null

        Object.assign(banner, bannerData)
        await this.bannerRepository.save(banner)
        return HomePageBannerMapper.fromEntityToModel(banner)
    }

    async deleteBanner(bannerId: number): Promise<boolean> {
        const banner = await this.bannerRepository.findOne({ where: { id: bannerId } })
        if (!banner) return false

        await this.bannerRepository.remove(banner)
        return true
    }

    async getAllBanners(): Promise<HomePageBanner[]> {
        const banners = await this.bannerRepository.find()
        return banners.map(banner => HomePageBannerMapper.fromEntityToModel(banner))
    }

    async searchBannersByImage(imageBuffer: Buffer): Promise<HomePageBanner[]> {
        const banners = await this.bannerRepository.find({ where: { image: imageBuffer } })
        return banners.map(banner => HomePageBannerMapper.fromEntityToModel(banner))
    }
}
