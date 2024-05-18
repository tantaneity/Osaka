import { UserInfoDto } from "./UserDto"
import Permission from "../../common/users/Permission"

export default interface AdminShortDto {
    id: string
    user: UserInfoDto
    permissions: Permission[]
}