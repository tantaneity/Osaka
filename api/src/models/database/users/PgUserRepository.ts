import { Repository } from 'typeorm'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { UserSignInDto, UserSignUpDto, UserResetPasswordDto, UserInfoDto } from '../../dtos/user/UserDto'
import { UserEntity } from '../../entities/UserEntity'
import { UserMapper } from '../../mappers/UserMapper'
import User from '../../common/users/User'
import { ApiError } from '../../../errors/api/ApiError'
import { AppDataSource } from '../../../config/data-source'

export class PgUserRepository implements IUserRepository {
    
    private readonly userRepository: Repository<UserEntity>

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    async getAllUsers(): Promise<UserInfoDto[]> {
        const users = await this.userRepository.find()
        return UserMapper.fromUserEntitiesToUserInfoDto(users)
    }

    async createUser(userData: UserSignUpDto): Promise<User> {
        const { username, first_name, last_name, email, password } = userData
        const registrationDate = new Date()

        const newUser = this.userRepository.create({
            username,
            first_name,
            last_name,
            email,
            password,
            registrationDate
        })

        const savedUser = await this.userRepository.save(newUser)
        
        return UserMapper.fromUserEntityToUser(savedUser)
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (!user) throw ApiError.notFound('User not found')
        return user ? UserMapper.fromUserEntityToUser(user) : null
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username: username } })
        if (!user) throw ApiError.notFound('User not found')
        return user ? UserMapper.fromUserEntityToUser(user) : null
    }
    
    async updateUser(userId: string, userData: Partial<UserInfoDto>): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } })
            if (!user) throw ApiError.notFound('User not found')

            Object.assign(user, userData)
            await this.userRepository.save(user)
            return UserMapper.fromUserEntityToUser(user)
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to update user', error)
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } })
            if (!user) throw ApiError.notFound('User not found')

            await this.userRepository.remove(user)
            return true
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to delete user', error)
        }
    }

    async signIn(userCredentials: UserSignInDto): Promise<User | null> {
        try {
            return null
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to sign in user', error)
        }
    }

    async resetPassword(userData: UserResetPasswordDto): Promise<boolean> {
        try {
            return false
        } catch (error: any) {
            throw ApiError.internalServerError('Failed to reset password', error)
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        console.log(`Fetching user with email: ${email}`);
        try {
            const user = await this.userRepository.findOneByOrFail({ email: email });
            console.log(`User found: ${JSON.stringify(user)}`);
            return user ? UserMapper.fromUserEntityToUser(user) : null;
        } catch (error) {
            console.error(`Error fetching user with email ${email}:`, error);
            throw ApiError.notFound('User not found');
        }
    }
    
}
