import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, BaseEntity } from 'typeorm'
import {UserEntity} from './UserEntity'
import {ProductEntity} from './ProductEntity'

@Entity({
    name: "Reviews"
})
export class ReviewEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => UserEntity, user => user.reviews)
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.reviews)
    product: ProductEntity

    @Column()
    rating: number

    @Column()
    comment: string

    @OneToMany(() => ReviewEntity, reply => reply.parentReview, { nullable: true })
    replies: ReviewEntity[]

    @ManyToOne(() => ReviewEntity, parentReview => parentReview.replies, { nullable: true })
    parentReview: ReviewEntity

    @CreateDateColumn({ type: 'timestamp' })
    datePosted: Date
}
