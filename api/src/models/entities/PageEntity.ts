import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { UserEntity } from './UserEntity'

@Entity({ name: "Pages" })
export class PageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn({ type: 'timestamp' })
    dateCreated: Date

    @ManyToOne(() => UserEntity, user => user.pages)
    user: UserEntity

    @Column()
    userId: number
}
