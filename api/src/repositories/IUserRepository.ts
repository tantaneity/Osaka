import User from '../models/common/users/User'
import { UserSignInDto, UserSignUpDto, UserResetPasswordDto, UserInfoDto } from '../models/dtos/user/UserDto'

export interface IUserRepository {
    getUserById(userId: string): Promise<User | null>
    createUser(userData: UserSignUpDto): Promise<User>
    updateUser(userId: string, userData: Partial<User>): Promise<User | null>
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean>
    deleteUser(userId: string): Promise<boolean>
    getAllUsers(): Promise<UserInfoDto[]>
    getUserByEmail(email:string): Promise<User | null>
    getUserByUsername(username:string): Promise<User | null>
}
