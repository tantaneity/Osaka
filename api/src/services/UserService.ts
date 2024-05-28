import { IUserRepository } from '../repositories/IUserRepository'
import { UserSignUpDto, UserSignInDto, UserResetPasswordDto, UserInfoDto, UserShortInfoDto } from '../models/dtos/user/UserDto'
import bcrypt from 'bcrypt'
import User from '../models/common/users/User'
import { UserMapper } from '../models/mappers/UserMapper'
import { ApiError } from '../errors/api/ApiError'
import { PgTokenRepository } from '../models/database/jwt/PgTokenRepository'
import TokenService from './TokenService'

export class UserService {
    private readonly tokenService: TokenService

    constructor(private readonly userRepository: IUserRepository) {
        const tokenRepository = new PgTokenRepository()
        this.tokenService = new TokenService(tokenRepository)
    }

    async getUserById(userId: string): Promise<UserInfoDto | null> {
        const user = await this.userRepository.getUserById(userId)
        if (!user) {
            throw ApiError.badRequest("User not found")
        }
        return UserMapper.toUserInfoDto(user)
    }

    async getUserByEmail(email: string): Promise<UserInfoDto | null> {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw ApiError.badRequest("User not found")
        }
        return UserMapper.toUserInfoDto(user)
    }

    async getUserByUsername(username: string): Promise<UserInfoDto | null> {
        const user = await this.userRepository.getUserByUsername(username)
        if (!user) {
            throw ApiError.badRequest("User not found")
        }
        return UserMapper.toUserInfoDto(user)
    }
    async refresh(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw ApiError.unauthorized("User is unauthorized")
        }

        const userData = this.tokenService.validateRefreshToken(refreshToken)
        const dbToken = await this.tokenService.getToken(refreshToken)

        if (!userData || !dbToken) {
            throw ApiError.unauthorized("User is unauthorized")
        }
        console.log(dbToken.user.id)
        const user = await this.userRepository.getUserById(dbToken.user.id)
        if (!user) {
            throw ApiError.badRequest("User not found")
        }

        const tokens = await this.generateAndStoreTokens(user)

        return { user:userData, ...tokens }
    }

    async getAllUsers(): Promise<UserInfoDto[]> {
        return this.userRepository.getAllUsers()
    }

    async createUser(userData: UserSignUpDto): Promise<User> {
        return await this.userRepository.createUser(userData)
    }

    async deleteUser(userId: string): Promise<boolean> {
        return this.userRepository.deleteUser(userId)
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.getUserByUsername(username)
        if (!user) {
            throw ApiError.badRequest("User was not found.")
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badRequest("Incorrect password")
        }

        const tokens = await this.generateAndStoreTokens(user)

        return { ...tokens }
    }

    async logout(refreshToken: string) {
        return await this.tokenService.deleteToken(refreshToken)
    }

    async resetPassword(userData: UserResetPasswordDto): Promise<boolean> {
        return this.userRepository.resetPassword(userData)
    }

    async registration(username: string, first_name: string, last_name: string, email: string, password: string) {
        let candidate = await this.userRepository.getUserByUsername(username)
        if (candidate) {
            throw ApiError.badRequest("User with the same username already exists")
        }

        candidate = await this.userRepository.getUserByEmail(email)
        if (candidate) {
            throw ApiError.badRequest("User with the same email already exists")
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const user = await this.createUser({
            username,
            first_name,
            last_name,
            email,
            password: hashPassword
        })

        const tokens = await this.generateAndStoreTokens(user)

        return { ...tokens }
    }

    private async generateAndStoreTokens(user: User): Promise<{
        tokens: {
            accessToken: string
            refreshToken: string
        }
        userDto: UserShortInfoDto
        }> {
        const userDto = UserMapper.toUserShortInfoDto(user)
        const tokens = this.tokenService.generateTokens({ ...userDto })
        await this.tokenService.createToken(user.id, tokens.refreshToken)

        return { tokens, userDto }
    }
}
