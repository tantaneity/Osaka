import { config } from 'dotenv'

config()


import { ITokenRepository } from '../repositories/ITokenRepository'
import Token from '../models/common/jwt/Token'
import jwt from 'jsonwebtoken'
import { TokenEntity } from '../models/entities/TokenEntity'
import { PgTokenRepository } from '../models/database/jwt/PgTokenRepository'

export default class TokenService {
    
    constructor(private readonly tokenRepository: ITokenRepository = new PgTokenRepository()) {}

    async createToken(userId: string, refreshToken: string): Promise<Token | null> {
        const tokenData = await this.getTokenByUserId(userId)
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await this.tokenRepository.updateToken(userId, refreshToken)
        }
        const token = await this.tokenRepository.createToken(userId, refreshToken)
        return token
    }
    
    generateTokens(payload: string | object | Buffer) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "", { expiresIn: '30d' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "", { expiresIn: '7d' })
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token: string){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "") as jwt.JwtPayload
            return userData
        } catch (e) {
            return null
        }
    }
    
    validateRefreshToken(token: string){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "")
            return userData
        } catch (e) {
            return null
        }
    }

    async getTokenByUserId(userId: string): Promise<Token | null> {
        const token = await this.tokenRepository.getTokenByUserId(userId)
        return token
    }

    async getToken(refreshToken: string): Promise<Token | null> {
        const token = await this.tokenRepository.getToken(refreshToken)
        return token
    }
    async updateToken(userId: string, refreshToken: string): Promise<Token | null> {
        const token = await this.tokenRepository.updateToken(userId, refreshToken)
        return token
    }

    async deleteToken(refreshToken: string): Promise<TokenEntity> {
        return this.tokenRepository.deleteToken(refreshToken)
    }
}
