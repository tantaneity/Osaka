import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { AdminEntity } from './AdminEntity'

@Entity({
    name: "Permissions"
})
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => AdminEntity, admin => admin.permissions)
    admin: AdminEntity;
}
