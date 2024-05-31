import { NextFunction, Request, Response } from 'express'
import { HomePageBannerService } from '../../services/HomePageBannerService'
import { ApiError } from '../../errors/api/ApiError'
import HomePageBanner from '../../models/common/admin/banner/Banner'

export class HomePageBannerController {
    constructor(private readonly bannerService: HomePageBannerService) {}

    async getBannerById(req: Request, res: Response, next: NextFunction) {
        try {
            const bannerId = parseInt(req.params.id)
            const banner = await this.bannerService.getBannerById(bannerId)
            if (!banner) {
                return next(ApiError.notFound('HomePageBanner not found'))
            }
            res.json(banner)
        } catch (error) {
            next(error)
        }
    }

    async createBanner(req: Request, res: Response, next: NextFunction) {
        try {
            const bannerData: HomePageBanner = req.body
            const banner = await this.bannerService.createBanner(bannerData)
            res.json(banner)
        } catch (error) {
            next(error)
        }
    }

    async updateBanner(req: Request, res: Response, next: NextFunction) {
        try {
            const bannerId = parseInt(req.params.id)
            const bannerData: Partial<HomePageBanner> = req.body
            const updatedBanner = await this.bannerService.updateBanner(bannerId, bannerData)
            if (!updatedBanner) {
                return next(ApiError.notFound('HomePageBanner not found'))
            }
            res.json(updatedBanner)
        } catch (error) {
            next(error)
        }
    }

    async deleteBanner(req: Request, res: Response, next: NextFunction) {
        try {
            const bannerId = parseInt(req.params.id)
            const result = await this.bannerService.deleteBanner(bannerId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getAllBanners(req: Request, res: Response, next: NextFunction) {
        try {
            const banners = await this.bannerService.getAllBanners()
            res.json(banners)
        } catch (error) {
            next(error)
        }
    }

    async searchBannersByImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageBuffer = req.body.image as Buffer
            const banners = await this.bannerService.searchBannersByImage(imageBuffer)
            res.json(banners)
        } catch (error) {
            next(error)
        }
    }
}
