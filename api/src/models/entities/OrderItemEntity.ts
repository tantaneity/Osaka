import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './ProductEntity';
import { OrderEntity } from './OrderEntity';

@Entity({ name: 'OrderItems' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProductEntity, product => product.orderItems)
    @JoinColumn()
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, order => order.orderItems)
    @JoinColumn()
    order: OrderEntity;

    @Column()
    price: number;

    @Column()
    quantity: number;
}
