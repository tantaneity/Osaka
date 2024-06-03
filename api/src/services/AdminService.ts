import { IAdminRepository } from '../repositories/IAdminRepository';
import Admin from '../models/common/users/Admin';
import Permission from '../models/common/users/Permission';
import { ApiError } from '../errors/api/ApiError';

export class AdminService {
    constructor(private readonly adminRepository: IAdminRepository) {}

    async getAdminById(adminId: string): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminById(adminId);
        return admin;
    }

    async getAdminByUserId(userId: string): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminByUserId(userId);
        return admin;
    }

    async createAdmin(adminData: Admin): Promise<Admin> {
        return await this.adminRepository.createAdmin(adminData);
    }

    async updateAdmin(adminId: string, adminData: Partial<Admin>): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminById(adminId);
        if (!admin) {
            throw ApiError.notFound('Admin not found');
        }
        return await this.adminRepository.updateAdmin(adminId, adminData);
    }

    async deleteAdmin(adminId: string): Promise<boolean> {
        const admin = await this.adminRepository.getAdminById(adminId);
        if (!admin) {
            throw ApiError.notFound('Admin not found');
        }
        return await this.adminRepository.deleteAdmin(adminId);
    }

    async getAllAdmins(): Promise<Admin[]> {
        return await this.adminRepository.getAllAdmins();
    }

    async getAllPermissions(): Promise<Permission[]> {
        return await this.adminRepository.getAllPermissions();
    }

    async getAdminsByPermission(permissionName: string): Promise<Admin[]> {
        return await this.adminRepository.getAdminsByPermission(permissionName);
    }

    async getPermissionsByAdmin(adminId: string): Promise<Permission[]> {
        return await this.adminRepository.getPermissionsByAdmin(adminId);
    }

    async grantPermission(adminId: string, permissionName: string): Promise<boolean> {
        return await this.adminRepository.grantPermission(adminId, permissionName);
    }

    async revokePermission(adminId: string, permissionName: string): Promise<boolean> {
        return await this.adminRepository.revokePermission(adminId, permissionName);
    }
}
