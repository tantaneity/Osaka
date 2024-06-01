export default interface ContentBlock {
    id: string;
    type: 'text' | 'image';
    value: string | {
        type: string
        data: ArrayBuffer
    };
    newsId: string;
}
