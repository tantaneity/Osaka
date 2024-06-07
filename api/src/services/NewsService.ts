import { INewsRepository } from '../repositories/INewsRepository';
import { ApiError } from '../errors/api/ApiError';
import { News } from '../models/common/news/News';

export class NewsService {
    constructor(private readonly newsRepository: INewsRepository) {}

    async getNewsById(newsId: string): Promise<News | null> {
        const news = await this.newsRepository.getNewsById(newsId);
        if (!news) {
            throw ApiError.notFound("News not found");
        }
        return news;
    }

    async createNews(newsData: News): Promise<News> {
        return await this.newsRepository.createNews(newsData);
    }

    async updateNews(newsId: string, newsData: Partial<News>): Promise<News | null> {
        const news = await this.newsRepository.getNewsById(newsId);
        if (!news) {
            throw ApiError.notFound("News not found");
        }
        return await this.newsRepository.updateNews(newsId, newsData);
    }

    async deleteNews(newsId: string): Promise<boolean> {
        const news = await this.newsRepository.getNewsById(newsId);
        if (!news) {
            throw ApiError.notFound("News not found");
        }
        return await this.newsRepository.deleteNews(newsId);
    }

    async getAllNews(): Promise<News[]> {
        return await this.newsRepository.getAllNews();
    }

    async searchNewsByTitle(title: string): Promise<News[]> {
        return await this.newsRepository.searchNewsByTitle(title);
    }
}
