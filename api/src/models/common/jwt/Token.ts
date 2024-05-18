import User from "../users/User"

export default interface Token {
    user: User
    refreshToken: string
}