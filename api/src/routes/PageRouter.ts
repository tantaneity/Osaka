import { Router, Request, Response, NextFunction } from 'express';
import { PageService } from '../services/PageService';
import { PageController } from '../controllers/admin/PageController';
import { PgPageRepository } from '../models/database/admin/PgPageRepository';

const pageRepository = new PgPageRepository()
const pageService = new PageService(pageRepository);
const pageController = new PageController(pageService);
const PageRouter = Router();

PageRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.getPageById(req, res, next);
});

PageRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.createPage(req, res, next);
});

PageRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.updatePage(req, res, next);
});

PageRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.deletePage(req, res, next);
});

PageRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.getAllPages(req, res, next);
});

PageRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.getPagesByUserId(req, res, next);
});

PageRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    await pageController.searchPagesByTitle(req, res, next);
});

export default PageRouter;
