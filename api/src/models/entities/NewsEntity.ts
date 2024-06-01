import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ContentBlockEntity } from './ContentBlockEntity';

@Entity({ name: 'News' })
export class NewsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn({ type: 'timestamp' })
    date: Date;

    @OneToMany(() => ContentBlockEntity, contentBlock => contentBlock.news, { cascade: true })
    contentBlocks: ContentBlockEntity[];
}
