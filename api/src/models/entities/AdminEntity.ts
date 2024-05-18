import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { PermissionEntity } from './PermissionEntity'
import { UserEntity } from './UserEntity'

@Entity({
    name: "Admins"
})
export class AdminEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => PermissionEntity, permission => permission.admin)
    permissions: PermissionEntity[];
}
