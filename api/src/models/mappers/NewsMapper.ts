import { NewsEntity } from '../entities/NewsEntity';
import { News } from '../common/news/News';
import { ContentBlock } from '../common/news/ContentBlock';

export class NewsMapper {
    static fromNewsEntityToNews(newsEntity: NewsEntity): News {
        const { id, title, date, contentBlocks } = newsEntity;
        const content: ContentBlock[] = contentBlocks.map(block => ({
            id: block.id,
            type: block.type,
            value: block.type === 'image' ? Buffer.from(block.value, 'base64') : block.value,
            newsId: block.news.id,
        }));
        return { id, title, date, content };
    }
}
