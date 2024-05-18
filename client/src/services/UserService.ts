import { UserShort } from "@/types/users/UserShort"
import { api } from "@/api"

class UserService {
    private ROUTE_PREFIX = '/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.ROUTE_PREFIX)).data
        return users
    }
}

export default new UserService()