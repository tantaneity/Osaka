import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { ProductEntity } from './ProductEntity'

@Entity({
    name: "Categories"
})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: "bytea", nullable: true })
    image?: Buffer

    @Column({ type: "text", nullable: true })
    base64Url?: string

    @ManyToOne(() => CategoryEntity, category => category.subcategories)
    parentCategory?: CategoryEntity

    @OneToMany(() => CategoryEntity, category => category.parentCategory)
    subcategories: CategoryEntity[]

    @ManyToMany(() => ProductEntity, product => product.categories)
    products: ProductEntity[]
}
