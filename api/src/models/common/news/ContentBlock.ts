export interface ContentBlock {
    id: string;
    type: 'text' | 'image';
    value: string | Buffer;
    newsId: string;
}
