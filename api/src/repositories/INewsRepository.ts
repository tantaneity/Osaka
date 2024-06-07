import { News } from "../models/common/news/News";


export interface INewsRepository {
    getNewsById(newsId: string): Promise<News | null>;
    createNews(newsData: News): Promise<News>;
    updateNews(newsId: string, newsData: Partial<News>): Promise<News | null>;
    deleteNews(newsId: string): Promise<boolean>;
    getAllNews(): Promise<News[]>;
    searchNewsByTitle(title: string): Promise<News[]>;
}
