import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { CartEntity } from './CartEntity';
import { ProductEntity } from './ProductEntity';

@Entity({ name: 'CartItems' })
export class CartItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => CartEntity, cart => cart.items)
    cart: CartEntity;

    @ManyToOne(() => ProductEntity, product => product.cartItems)
    product: ProductEntity;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    dateCreated: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    dateModified: Date;
}