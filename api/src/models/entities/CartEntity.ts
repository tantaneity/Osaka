import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { UserEntity } from './UserEntity';
import { CartItemEntity } from './CartItemEntity';

@Entity({ name: 'Carts' })
export class CartEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
    items: CartItemEntity[];

    @ManyToOne(() => UserEntity, user => user.carts)
    user: UserEntity;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    dateCreated: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    dateModified: Date;
}
