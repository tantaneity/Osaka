import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import {ReviewEntity} from './ReviewEntity'
import { AdminEntity } from './AdminEntity'
import { CartEntity } from './CartEntity'
import { OrderEntity } from './OrderEntity'
import { PageEntity } from './PageEntity'


@Entity({
    name: "Users"
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    description: string

    @Column({ type: 'bytea', nullable: true })
    profilePicture: Buffer

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    registrationDate: Date

    @OneToMany(() => ReviewEntity, review => review.user)
    reviews: ReviewEntity[]

    @OneToOne(() => AdminEntity, admin => admin.user, { cascade: true })
    @JoinColumn()
    admin: AdminEntity

    @OneToMany(() => CartEntity, cart => cart.user)
    carts: CartEntity[];

    @OneToMany(() => OrderEntity, order => order.user) 
    orders: OrderEntity[];

    @OneToMany(() => PageEntity, page => page.user)
    pages: PageEntity[]
}
