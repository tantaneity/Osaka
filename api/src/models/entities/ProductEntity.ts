import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import {CategoryEntity} from './CategoryEntity'
import {ReviewEntity} from './ReviewEntity'
import {ImageEntity} from './ImageEntity'
import { CartItemEntity } from './CartItemEntity'
import { SellEntity } from './SellEntity'
import { OrderItemEntity } from './OrderItemEntity'
@Entity({
    name: "Products"
})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column()
    quantity: number

    @OneToMany(() => ImageEntity, image => image.product, { nullable: true })
    images: ImageEntity[]

    @OneToMany(() => ReviewEntity, review => review.product, { nullable: true })
    reviews: ReviewEntity[]

    @ManyToMany(() => CategoryEntity, category => category.products)
    @JoinTable({name: "Category"})
    categories: CategoryEntity[] 

    @OneToMany(() => SellEntity, sell => sell.product)
    sells: SellEntity[];

    @OneToMany(() => CartItemEntity, cartItem => cartItem.product)
    cartItems: CartItemEntity[];

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.product) // Добавлена ассоциация с OrderItemEntity
    orderItems: OrderItemEntity[];

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    dateAdded: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    dateModified: Date
}
