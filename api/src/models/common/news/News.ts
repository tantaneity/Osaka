import { ContentBlock } from "./ContentBlock";

export interface News {
    id: string;
    title: string;
    content: ContentBlock[];
    date: Date;
}