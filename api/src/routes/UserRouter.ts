import { Router, Request, Response, NextFunction } from 'express'
import { UserController } from '../controllers/users/UserController'
import { UserService } from '../services/UserService'
import { PgUserRepository } from '../models/database/users/PgUserRepository'
import { AuthController } from '../controllers/auth/AuthController'
import { registrationValidationRules } from '../utils/data/Validation'
import { ApiError } from '../errors/api/ApiError'
import { authMiddleware } from '../middlewares/auth-middleware'

const userRepository = new PgUserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const authController = new AuthController(userService)
const UserRouter = Router()

UserRouter.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await userController.getAllUsers(req, res, next)
})

UserRouter.get('/one/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    
    await userController.getUserById(req, res, next)
})
UserRouter.post('/login',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.login(req, res, next)
})
UserRouter.post('/logout',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.logout(req, res, next)
})
UserRouter.post('/registration',
registrationValidationRules,
async (req: Request, res: Response, next: NextFunction) => {
    await authController.registration(req, res, next)
})
UserRouter.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    await authController.refresh(req, res, next)
})
export default UserRouter
