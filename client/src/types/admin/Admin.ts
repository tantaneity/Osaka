import { UserShort } from "../users/UserShort"
import { Permission } from "./Permission"

export interface Admin {
    id: string
    user: UserShort
    permissions: Permission[]
}