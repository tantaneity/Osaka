import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../../services/AdminService';
import Admin from '../../models/common/users/Admin';
import { ApiError } from '../../errors/api/ApiError';

export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const adminData: Admin = req.body;
            const admin = await this.adminService.createAdmin(adminData);
            res.json(admin);
        } catch (error) {
            next(error);
        }
    }

    async getAdminById(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const admin = await this.adminService.getAdminById(adminId);
            if (!admin) {
                return next(ApiError.badRequest('Admin not found'));
            }
            res.json(admin);
        } catch (error) {
            next(error);
        }
    }

    async getAdminByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const admin = await this.adminService.getAdminByUserId(userId);
            if (!admin) {
                return next(ApiError.badRequest('Admin not found'));
            }
            res.json(admin);
        } catch (error) {
            next(error);
        }
    }

    async getAllAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const admins = await this.adminService.getAllAdmins();
            res.json(admins);
        } catch (error) {
            next(error);
        }
    }

    async updateAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const adminData: Partial<Admin> = req.body;
            const updatedAdmin = await this.adminService.updateAdmin(adminId, adminData);
            if (!updatedAdmin) {
                return next(ApiError.badRequest('Admin not found'));
            }
            res.json(updatedAdmin);
        } catch (error) {
            next(error);
        }
    }

    async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const result = await this.adminService.deleteAdmin(adminId);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const permissions = await this.adminService.getAllPermissions();
            res.json(permissions);
        } catch (error) {
            next(error);
        }
    }

    async getAdminsByPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const permissionName = req.params.permissionName as string;
            const admins = await this.adminService.getAdminsByPermission(permissionName);
            res.json(admins);
        } catch (error) {
            next(error);
        }
    }

    async getPermissionsByAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const permissions = await this.adminService.getPermissionsByAdmin(adminId);
            res.json(permissions);
        } catch (error) {
            next(error);
        }
    }

    async grantPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const permissionName = req.body.permissionName as string;
            const result = await this.adminService.grantPermission(adminId, permissionName);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }

    async revokePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = req.params.id as string;
            const permissionName = req.body.permissionName as string;
            const result = await this.adminService.revokePermission(adminId, permissionName);
            res.json({ success: result });
        } catch (error) {
            next(error);
        }
    }
}
