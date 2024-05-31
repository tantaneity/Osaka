import { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/api/ApiError"
import { PgAdminRepository } from "../models/database/users/PgAdminRepository"
import TokenService from "../services/TokenService"
import { AdminService } from "../services/AdminService"

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.unauthorized())
        }
        const accessToken = authorizationHeader.split(" ")[1]
        if (!accessToken) {
            return next(ApiError.unauthorized())
        }
        const tokenService = new TokenService()
        const adminRepository = new PgAdminRepository();
        const adminService = new AdminService(adminRepository);
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.unauthorized())
        }
        const admin = await adminService.getAdminById(userData.id);

        if (!admin) {
            return next(ApiError.badRequest('User is not an admin'));
        }
        next()
    } catch (e) {
        console.log(e);
        return next(e)
    }
}
