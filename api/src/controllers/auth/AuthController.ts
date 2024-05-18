import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../services/UserService'
import { UserSignUpDto, UserSignInDto, UserResetPasswordDto } from '../../models/dtos/user/UserDto'
import { ApiError } from '../../errors/api/ApiError'
import { validationResult } from 'express-validator'
export class AuthController {
    constructor(private readonly userService: UserService) {}

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.badRequest("Validation error", errors.array()))
            }
            const {username, first_name, last_name, email, password} = req.body
            const userData = await this.userService.registration(username, first_name, last_name, email, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(req.body)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body
            const userData = await this.userService.login(username, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Cookie')?.split(' ').find(cookie => cookie.startsWith('refreshToken'))?.split('=')[1]

            if (!refreshToken) {
                return next(ApiError.badRequest('Refresh token is missing'))
            }
            const token = await this.userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Cookie')?.split(' ').find(cookie => cookie.startsWith('refreshToken'))?.split('=')[1]
            const userData = await this.userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    

}
