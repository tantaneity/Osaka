import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProductEntity } from './ProductEntity';

@Entity({
    name: "Sells"
})
export class SellEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProductEntity, product => product.sells)
    product: ProductEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    dateSold: Date;
}
