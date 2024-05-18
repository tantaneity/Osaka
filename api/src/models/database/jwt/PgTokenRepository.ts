import { Repository } from "typeorm"
import { TokenEntity } from "../../entities/TokenEntity"
import { ITokenRepository } from "../../../repositories/ITokenRepository"
import { AppDataSource } from "../../../config/data-source"
import Token from "../../common/jwt/Token"
import { ApiError } from "../../../errors/api/ApiError"
import { TokenMapper } from "../../mappers/TokenMapper"
import { PgUserRepository } from "../users/PgUserRepository"
import { UserMapper } from "../../mappers/UserMapper"


export class PgTokenRepository implements ITokenRepository {
    private readonly tokenRepository: Repository<TokenEntity>
    private readonly userRepository: PgUserRepository
    
    constructor() {
        this.tokenRepository = AppDataSource.getRepository(TokenEntity)
        this.userRepository = new PgUserRepository()
    }

    async createToken(userId: string, refreshToken: string): Promise<Token> {

        const user = await this.userRepository.getUserById(userId)
        if (!user) {
            throw ApiError.notFound('User not found')
        }
    
        const newToken = await this.tokenRepository.create({
            user: { id: userId },
            refreshToken
        })
        const savedToken = await this.tokenRepository.save(newToken)
        return TokenMapper.fromTokenEntityToToken(savedToken, user)
    }
    async getTokenByUserId(userId: string): Promise<Token | null> {
        const tokenEntity = await this.tokenRepository.findOne({ where: { user: { id: userId } } })
        if (!tokenEntity) {
            return null
        }

        const user = await this.userRepository.getUserById(userId)
        if (!user) {
            throw ApiError.notFound('User not found')
        }

        const token = TokenMapper.fromTokenEntityToToken(tokenEntity, user)
        return token
    }
    async getToken(refreshToken: string): Promise<Token | null> {
        const tokenEntity = await this.tokenRepository.findOne({ where: { refreshToken: refreshToken }, relations: ['user'] })
        if (!tokenEntity) {
            return null
        }
        const token = TokenMapper.fromTokenEntityToToken(tokenEntity, UserMapper.fromUserEntityToUser(tokenEntity.user))
        return token
    }
    async updateToken(userId: string, refreshToken: string): Promise<Token | null> {
        const tokenEntity = await this.tokenRepository.findOne({ where: { user: {id: userId } } })
        if (!tokenEntity) {
            throw ApiError.notFound('Token not found')
        }

        tokenEntity.refreshToken = refreshToken
        const updatedTokenEntity = await this.tokenRepository.save(tokenEntity)

        const user = await this.userRepository.getUserById(userId)
        if (!user) {
            throw ApiError.notFound('User not found')
        }

        const updatedToken = TokenMapper.fromTokenEntityToToken(updatedTokenEntity, user)
        return updatedToken
    }

    async deleteToken(refreshToken: string): Promise<TokenEntity> {
        const tokenEntity = await this.tokenRepository.findOne({ where: {refreshToken:refreshToken } })
        if (!tokenEntity) {
            throw ApiError.notFound('Token not found')
        }

        const remodedtokenEntity = await this.tokenRepository.remove(tokenEntity)
        return remodedtokenEntity
    }
}
