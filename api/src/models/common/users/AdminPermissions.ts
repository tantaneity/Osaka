import Permission from './Permission'
import Admin from './Admin'

export default interface AdminPermissions {
    admin: Admin
    permissions: Permission[]
}
