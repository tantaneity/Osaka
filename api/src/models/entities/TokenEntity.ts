import { Entity, Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './UserEntity'


@Entity({
    name: "Tokens"
})
export class TokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => UserEntity)
    user: UserEntity

    @Column()
    refreshToken: string
}