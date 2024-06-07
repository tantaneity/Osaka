import { Router, Request, Response, NextFunction } from 'express';
import { HomePageBannerService } from '../services/HomePageBannerService';
import { HomePageBannerController } from '../controllers/admin/HomePageBannerController';
import { PgHomePageBannerRepository } from '../models/database/admin/PgHomePageBannerRepository';

const bannerRepository = new PgHomePageBannerRepository();
const bannerService = new HomePageBannerService(bannerRepository);
const bannerController = new HomePageBannerController(bannerService);
const HomePageBannerRouter = Router();

HomePageBannerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.getBannerById(req, res, next);
});

HomePageBannerRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.createBanner(req, res, next);
});

HomePageBannerRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.updateBanner(req, res, next);
});

HomePageBannerRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.deleteBanner(req, res, next);
});

HomePageBannerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.getAllBanners(req, res, next);
});

HomePageBannerRouter.post('/search', async (req: Request, res: Response, next: NextFunction) => {
    await bannerController.searchBannersByImage(req, res, next);
});

export default HomePageBannerRouter;
