import { Repository, Like } from 'typeorm';
import { NewsEntity } from '../../entities/NewsEntity';
import { INewsRepository } from '../../../repositories/INewsRepository';
import { AppDataSource } from '../../../config/data-source';
import { NewsMapper } from '../../mappers/NewsMapper';
import { News } from '../../common/news/News';


export class PgNewsRepository implements INewsRepository {

    private readonly newsRepository: Repository<NewsEntity>;

    constructor() {
        this.newsRepository = AppDataSource.getRepository(NewsEntity);
    }

    async getNewsById(newsId: string): Promise<News | null> {
        const news = await this.newsRepository.findOne({ where: { id: newsId }, relations: ['contentBlocks'] });
        return news ? NewsMapper.fromNewsEntityToNews(news) : null;
    }

    async createNews(newsData: News): Promise<News> {
        const newsEntity = this.newsRepository.create(newsData)
        const savedNews = await this.newsRepository.save(newsEntity);
        return NewsMapper.fromNewsEntityToNews(savedNews);
    }

    async updateNews(newsId: string, newsData: Partial<News>): Promise<News | null> {
        const news = await this.newsRepository.findOne({ where: { id: newsId }, relations: ['contentBlocks'] });
        if (!news) return null;

        Object.assign(news, newsData);
        await this.newsRepository.save(news);
        return NewsMapper.fromNewsEntityToNews(news);
    }

    async deleteNews(newsId: string): Promise<boolean> {
        const news = await this.newsRepository.findOne({ where: { id: newsId }, relations: ['contentBlocks'] });
        if (!news) return false;

        await this.newsRepository.remove(news);
        return true;
    }

    async getAllNews(): Promise<News[]> {
        const news = await this.newsRepository.find({ relations: ['contentBlocks'] });
        return news.map(newsItem => NewsMapper.fromNewsEntityToNews(newsItem));
    }

    async searchNewsByTitle(title: string): Promise<News[]> {
        const news = await this.newsRepository.find({ where: { title: Like(`%${title}%`) }, relations: ['contentBlocks'] });
        return news.map(newsItem => NewsMapper.fromNewsEntityToNews(newsItem));
    }
}