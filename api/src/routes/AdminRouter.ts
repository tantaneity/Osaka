import { Router, Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/AdminService';
import { authMiddleware } from '../middlewares/auth-middleware';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { PgAdminRepository } from '../models/database/users/PgAdminRepository';
import { AdminController } from '../controllers/users/AdminController';


const adminRepository = new PgAdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);
const AdminRouter = Router();

AdminRouter.use(adminMiddleware);

AdminRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getAllAdmins(req, res, next);
});

AdminRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getAdminById(req, res, next);
});

AdminRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.createAdmin(req, res, next);
});

AdminRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.updateAdmin(req, res, next);
});

AdminRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.deleteAdmin(req, res, next);
});

AdminRouter.get('/:id/permissions', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getPermissionsByAdmin(req, res, next);
});

AdminRouter.get('/permissions/:permissionName', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getAdminsByPermission(req, res, next);
});

AdminRouter.post('/:id/permissions', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.grantPermission(req, res, next);
});

AdminRouter.delete('/:id/permissions/:permissionName', async (req: Request, res: Response, next: NextFunction) => {
    await adminController.revokePermission(req, res, next);
});

export default AdminRouter;
