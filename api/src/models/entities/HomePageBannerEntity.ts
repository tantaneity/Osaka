import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: "HomePageBanners" })
export class HomePageBannerEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'bytea' })
    image: Buffer
}
