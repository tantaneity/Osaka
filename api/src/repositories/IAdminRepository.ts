import Admin from "../models/common/users/Admin";
import Permission from "../models/common/users/Permission";
import AdminShortDto from "../models/dtos/user/AdminDto";

export interface IAdminRepository {
    getAdminById(adminId: string): Promise<Admin | null>;
    getAdminByUserId(userId: string): Promise<Admin | null>;
    createAdmin(adminData: Admin): Promise<Admin>;
    updateAdmin(adminId: string, adminData: Partial<Admin>): Promise<Admin | null>;
    deleteAdmin(adminId: string): Promise<boolean>;
    getAllAdmins(): Promise<Admin[]>;
    getAllPermissions(): Promise<Permission[]>;
    getAdminsByPermission(permissionName: string): Promise<Admin[]>;
    getPermissionsByAdmin(adminId: string): Promise<Permission[]>
    grantPermission(adminId: string, permissionName: string): Promise<boolean>;
    revokePermission(adminId: string, permissionName: string): Promise<boolean>;
}
