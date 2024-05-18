import { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/api/ApiError"
import { PgTokenRepository } from "../models/database/jwt/PgTokenRepository"
import TokenService from "../services/TokenService"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.unauthorized())
        }
        next()
    } catch (e) {
        return next(ApiError.unauthorized())
    }
}