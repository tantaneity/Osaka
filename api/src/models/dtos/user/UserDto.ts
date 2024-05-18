export interface UserSignInDto {
    username: string
    password: string
}

export interface UserSignUpDto {
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface UserResetPasswordDto {
    id: string
    username: string
    password: string
}

export interface UserInfoDto {
    id: string
    first_name: string
    last_name: string
    username: string
    email: string
    registrationDate: Date
}
export interface UserShortInfoDto {
    id: string
    username: string
    email: string
}