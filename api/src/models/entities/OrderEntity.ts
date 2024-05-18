import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './UserEntity';
import { OrderItemEntity } from './OrderItemEntity';
import { OrderStatusEntity } from './OrderStatusEntity';

@Entity({ name: 'Orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => OrderStatusEntity)
    @JoinColumn()
    orderStatus: OrderStatusEntity;

    @Column()
    orderApprovedAt: Date

    @Column({ nullable: true})
    orderDeliveredCarrierDate: Date;

    @Column({ nullable: true })
    orderDeliveredUserDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
    orderItems: OrderItemEntity[];
}
