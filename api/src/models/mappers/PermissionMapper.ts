import Permission from "../common/users/Permission";
import { PermissionEntity } from "../entities/PermissionEntity";
export class PermissionMapper {
    static fromPermissionEntityToPermission(permissionEntity: PermissionEntity): Permission {
        return {
            id: permissionEntity.id,
            name: permissionEntity.name,
            description: permissionEntity.description
        }
    }
}