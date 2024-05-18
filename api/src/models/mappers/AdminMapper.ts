import Admin from "../common/users/Admin";
import { AdminEntity } from "../entities/AdminEntity";
import { PermissionMapper } from "./PermissionMapper";
import { UserMapper } from "./UserMapper";

export class AdminMapper {
    static fromAdminEntityToAdmin(entity: AdminEntity): Admin {
        return {
            id: entity.id,
            user: UserMapper.fromUserEntityToUser(entity.user),
            permissions: entity.permissions.map(permission => PermissionMapper.fromPermissionEntityToPermission(permission)),
        }
    }
}