import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NewsEntity } from './NewsEntity';

@Entity({ name: 'ContentBlocks' })
export class ContentBlockEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: 'text' | 'image';

    @Column({ type: 'text' })
    value: string;

    @ManyToOne(() => NewsEntity, news => news.contentBlocks)
    @JoinColumn({ name: 'newsId' })
    news: NewsEntity;
}
