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

    @Column({ type: 'bytea', nullable: true })
    data: Buffer

    @Column({ type: 'text', nullable: true })
    base64Url: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
}
