import User from './User'
import Permission from './Permission'
import { UserShortInfoDto } from '../../dtos/user/UserDto'

export default interface Admin {
    id: string
    user: User | UserShortInfoDto
    permissions: Permission[]
}
