import User from './User'
import Permission from './Permission'

export default interface Admin {
    id: string
    user: User
    permissions: Permission[]
}
