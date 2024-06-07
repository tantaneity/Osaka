import { api } from "@/api";
import { News } from "@/types/admin/News";

class NewsService {
    private ROUTE_PREFIX = 'api/news';

    async getNews(): Promise<News[]> {
        const news = (await api.get<News[]>(this.ROUTE_PREFIX)).data;
        return news;
    }

    async getNewsById(newsId: string): Promise<News> {
        const news = (await api.get<News>(`${this.ROUTE_PREFIX}/${newsId}`)).data;
        return news;
    }

    async createNews(newsData: News): Promise<News> {
        const news = (await api.post<News>(this.ROUTE_PREFIX, newsData)).data;
        return news;
    }

    async updateNews(newsId: string, newsData: Partial<News>): Promise<News> {
        const news = (await api.put<News>(`${this.ROUTE_PREFIX}/${newsId}`, newsData)).data;
        return news;
    }

    async deleteNews(newsId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${newsId}`);
    }

    async searchNewsByTitle(title: string): Promise<News[]> {
        const news = (await api.get<News[]>(`${this.ROUTE_PREFIX}/search`, { params: { title } })).data;
        return news;
    }
}

export default new NewsService();
