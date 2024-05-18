import { Repository } from 'typeorm';
import { ApiError } from '../../../errors/api/ApiError';
import { AppDataSource } from '../../../config/data-source';
import { IAdminRepository } from '../../../repositories/IAdminRepository';
import { AdminMapper } from '../../mappers/AdminMapper';
import { AdminEntity } from '../../entities/AdminEntity';
import { PermissionEntity } from '../../entities/PermissionEntity';
import Admin from '../../common/users/Admin';
import Permission from '../../common/users/Permission';


export class PgAdminRepository implements IAdminRepository {
    private readonly adminRepository: Repository<AdminEntity>;
    private readonly permissionRepository: Repository<PermissionEntity>;

    constructor() {
        this.adminRepository = AppDataSource.getRepository(AdminEntity);
        this.permissionRepository = AppDataSource.getRepository(PermissionEntity);
    }

    async getAdminById(adminId: string): Promise<Admin | null> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId } });
        return admin ? AdminMapper.fromAdminEntityToAdmin(admin) : null;
    }

    async createAdmin(adminData: Admin): Promise<Admin> {
        const newAdmin = this.adminRepository.create(adminData);
        const savedAdmin = await this.adminRepository.save(newAdmin);
        return AdminMapper.fromAdminEntityToAdmin(savedAdmin);
    }

    async updateAdmin(adminId: string, adminData: Partial<Admin>): Promise<Admin | null> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId } });
        if (!admin) {
            throw ApiError.notFound('Admin not found');
        }
        Object.assign(admin, adminData);
        const updatedAdmin = await this.adminRepository.save(admin);
        return AdminMapper.fromAdminEntityToAdmin(updatedAdmin);
    }

    async deleteAdmin(adminId: string): Promise<boolean> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId } });
        if (!admin) {
            throw ApiError.notFound('Admin not found');
        }
        await this.adminRepository.remove(admin);
        return true;
    }

    async getAllAdmins(): Promise<Admin[]> {
        const admins = await this.adminRepository.find();
        return admins.map(admin => AdminMapper.fromAdminEntityToAdmin(admin));
    }

    async getAllPermissions(): Promise<Permission[]> {
        const permissions = await this.permissionRepository.find();
        return permissions;
    }

    async getAdminsByPermission(permissionName: string): Promise<Admin[]> {
        const permissions = await this.permissionRepository.find({ where: { name: permissionName } });
        const admins = await Promise.all(permissions.map(permission => this.adminRepository.find({ where: { permissions: permission } })));
        return admins.flat().map(admin => AdminMapper.fromAdminEntityToAdmin(admin));
    }

    async getPermissionsByAdmin(adminId: string): Promise<Permission[]> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId }, relations: ['permissions'] });
        return admin?.permissions ?? [];
    }

    async grantPermission(adminId: string, permissionName: string): Promise<boolean> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId } });
        const permission = await this.permissionRepository.findOne({ where: { name: permissionName } });
        if (!admin || !permission) {
            throw ApiError.notFound('Admin or permission not found');
        }
        admin.permissions.push(permission);
        await this.adminRepository.save(admin);
        return true;
    }

    async revokePermission(adminId: string, permissionName: string): Promise<boolean> {
        const admin = await this.adminRepository.findOne({ where: { id: adminId }, relations: ['permissions'] });
        if (!admin) {
            throw ApiError.notFound('Admin not found');
        }
        admin.permissions = admin.permissions.filter(permission => permission.name !== permissionName);
        await this.adminRepository.save(admin);
        return true;
    }
}