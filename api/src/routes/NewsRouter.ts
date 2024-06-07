import { Router, Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/NewsService';
import { PgNewsRepository } from '../models/database/news/PgNewsRepository';
import { NewsController } from '../controllers/news/NewsController';

const newsRepository = new PgNewsRepository();
const newsService = new NewsService(newsRepository);
const newsController = new NewsController(newsService);
const NewsRouter = Router();

NewsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.getNewsById(req, res, next);
});

NewsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.createNews(req, res, next);
});

NewsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.updateNews(req, res, next);
});

NewsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.deleteNews(req, res, next);
});

NewsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.getAllNews(req, res, next);
});

NewsRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    await newsController.searchNewsByTitle(req, res, next);
});

export default NewsRouter;
