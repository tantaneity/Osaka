import { NextFunction, Request, Response } from 'express';
import { NewsService } from '../../services/NewsService';
import { ApiError } from '../../errors/api/ApiError';
import { News } from '../../models/common/news/News';


export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    async getNewsById(req: Request, res: Response, next: NextFunction) {
        try {
            const newsId = req.params.id;
            const news = await this.newsService.getNewsById(newsId);
            if (!news) {
                return next(ApiError.notFound('News not found'));
            }
            res.json(news);
        } catch (error) {
            next(error);
        }
    }

    async createNews(req: Request, res: Response, next: NextFunction) {
        try {
            const newsData: News = req.body;
            const news = await this.newsService.createNews(newsData);
            res.json(news);
        } catch (error) {
            next(error);
        }
    }

    async updateNews(req: Request, res: Response, next: NextFunction) {
        try {
            const newsId = req.params.id;
            const newsData: Partial<News> = req.body;
            const updatedNews = await this.newsService.updateNews(newsId, newsData);
            if (!updatedNews) {
                return next(ApiError.notFound('News not found'));
            }
            res.json(updatedNews);
        } catch (error) {
            next(error);
        }
    }

    async deleteNews(req: Request, res: Response, next: NextFunction) {
        try {
            const newsId = req.params.id;
            const result = await this.newsService.deleteNews(newsId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllNews(req: Request, res: Response, next: NextFunction) {
        try {
            const news = await this.newsService.getAllNews();
            res.json(news);
        } catch (error) {
            next(error);
        }
    }

    async searchNewsByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.query.title as string;
            const news = await this.newsService.searchNewsByTitle(title);
            res.json(news);
        } catch (error) {
            next(error);
        }
    }
}
