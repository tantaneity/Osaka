import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import {ProductEntity} from './ProductEntity'

@Entity({
    name: "Images"
})
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => ProductEntity, product => product.images)
    product: ProductEntity

    @Column({ type: 'bytea' })
    data: Buffer

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
}
