import Token from "../models/common/jwt/Token"
import { TokenEntity } from "../models/entities/TokenEntity"

export interface ITokenRepository {
    createToken(userId: string, refreshToken: string): Promise<Token>
    getTokenByUserId(userId: string): Promise<Token | null>
    updateToken(userId: string, refreshToken: string): Promise<Token | null>
    deleteToken(refreshToken: string): Promise<TokenEntity>
    getToken(refreshToken: string): Promise<Token | null>
}