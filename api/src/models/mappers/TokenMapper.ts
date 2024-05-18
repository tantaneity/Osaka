import Token from '../common/jwt/Token'
import User from '../common/users/User'
import { TokenEntity } from '../entities/TokenEntity'

export class TokenMapper {
    static fromTokenEntityToToken(entity: TokenEntity, user: User): Token {
        return {
            user: user,
            refreshToken: entity.refreshToken
        }
    }
}
