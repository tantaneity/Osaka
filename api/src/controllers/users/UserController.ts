import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../services/UserService'
import { UserSignUpDto, UserSignInDto, UserResetPasswordDto } from '../../models/dtos/user/UserDto'
import { ApiError } from '../../errors/api/ApiError'
import { UserMapper } from '../../models/mappers/UserMapper'

export class UserController {
    constructor(private readonly userService: UserService) {}

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: UserSignUpDto = req.body
            const user = await this.userService.createUser(userData)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string
            const user = await this.userService.getUserById(userId)
            if (!user) {
                return next(ApiError.badRequest('User not found'))
            }
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers()
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

}
