import User from '../common/users/User'
import { UserSignInDto, UserSignUpDto, UserResetPasswordDto, UserInfoDto, UserShortInfoDto } from '../dtos/user/UserDto'
import { UserEntity } from '../entities/UserEntity'



export class UserMapper {


    static fromUserEntities(entities: UserEntity[]): User[] {
        return entities.map(entity => this.fromUserEntityToUser(entity))
    }
    static fromUserEntitiesToUserInfoDto(entities: UserEntity[]): UserInfoDto[] {
        return entities.map(entity => this.fromUserEntityToUserInfoDto(entity))
    }
    static fromUserEntity(entity: UserEntity): UserSignUpDto {
        return {
            username: entity.username,
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            password: entity.password
        }
    }
    static fromUserEntityToUserInfoDto(entity: UserEntity): UserInfoDto {
        return {
            id: entity.id,
            username: entity.username,
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            registrationDate: entity.registrationDate
        }
    }
    static fromUserEntityToUser(entity: UserEntity): User {
        return {
            id: entity.id,
            username: entity.username,
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            password: entity.password,
            description: entity.description,
            profileImage: entity.profilePicture,
            registrationDate: entity.registrationDate
        }
    }
    

    static toUserInfoDto(user: User): UserInfoDto {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            registrationDate: user.registrationDate
        }
    }
    static toUserShortInfoDto(user: User): UserShortInfoDto {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    static toUserSignUpDto(user: User): UserSignUpDto {
        return {
            ...user
        }
    }

    static toUserSignInDto(user: User): UserSignInDto {
        return {
            ...user
        }
    }

    static toUserResetPasswordDto(user: User): UserResetPasswordDto {
        return {
            ...user
        }
    }
}




