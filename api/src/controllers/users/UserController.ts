import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../services/UserService'
import { UserSignUpDto, UserSignInDto, UserResetPasswordDto, UserInfoDto } from '../../models/dtos/user/UserDto'
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

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id as string
            const userData: Partial<UserInfoDto> = req.body
            const updatedUser = await this.userService.updateUser(userId, userData)
            if (!updatedUser) {
                return next(ApiError.badRequest('User not found'))
            }
            res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getUserByUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username as string
            const user = await this.userService.getUserByUsername(username)
            if (!user) {
                return next(ApiError.badRequest('User not found'))
            }
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.params.id as string;
            await this.userService.changePassword(userId, currentPassword, newPassword);
            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            next(error);
        }
    }
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email as string
            const user = await this.userService.getUserByEmail(email)
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
