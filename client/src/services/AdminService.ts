import { Admin } from "@/types/admin/Admin";
import { Permission } from "@/types/admin/Permission";
import { api } from "@/api";

class AdminService {
    private ROUTE_PREFIX = 'api/admins';

    async getAdminById(adminId: string): Promise<Admin | null> {
        const admin = (await api.get<Admin>(`${this.ROUTE_PREFIX}/${adminId}`)).data;
        return admin;
    }

    async getAdminByUserId(userId: string): Promise<Admin | null> {
        const admin = (await api.get<Admin>(`${this.ROUTE_PREFIX}/user/${userId}`));
        if (!admin) return null
        return admin.data;
    }

    async createAdmin(adminData: Admin): Promise<Admin> {
        const admin = (await api.post<Admin>(this.ROUTE_PREFIX, adminData)).data;
        return admin;
    }

    async updateAdmin(adminId: string, adminData: Partial<Admin>): Promise<Admin | null> {
        const admin = (await api.put<Admin>(`${this.ROUTE_PREFIX}/${adminId}`, adminData)).data;
        return admin;
    }

    async deleteAdmin(adminId: string): Promise<boolean> {
        await api.delete(`${this.ROUTE_PREFIX}/${adminId}`);
        return true;
    }

    async getAllAdmins(): Promise<Admin[]> {
        const admins = (await api.get<Admin[]>(`${this.ROUTE_PREFIX}`)).data;
        return admins;
    }

    async getAllPermissions(): Promise<Permission[]> {
        const permissions = (await api.get<Permission[]>(`${this.ROUTE_PREFIX}/permissions`)).data;
        return permissions;
    }

    async getAdminsByPermission(permissionName: string): Promise<Admin[]> {
        const admins = (await api.get<Admin[]>(`${this.ROUTE_PREFIX}/permissions/${permissionName}`)).data;
        return admins;
    }

    async getPermissionsByAdmin(adminId: string): Promise<Permission[]> {
        const permissions = (await api.get<Permission[]>(`${this.ROUTE_PREFIX}/${adminId}/permissions`)).data;
        return permissions;
    }

    async grantPermission(adminId: string, permissionName: string): Promise<boolean> {
        const result = (await api.post<boolean>(`${this.ROUTE_PREFIX}/${adminId}/permissions/${permissionName}`)).data;
        return result;
    }

    async revokePermission(adminId: string, permissionName: string): Promise<boolean> {
        const result = (await api.delete<boolean>(`${this.ROUTE_PREFIX}/${adminId}/permissions/${permissionName}`)).data;
        return result;
    }
}

export default new AdminService();
