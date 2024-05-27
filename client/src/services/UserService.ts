import { UserShort } from "@/types/users/UserShort"
import { api } from "@/api"

class UserService {
    private ROUTE_PREFIX = 'api/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.ROUTE_PREFIX)).data
        return users
    }
    async getUserById(id: number) {
        return (await api.get<UserShort>(this.ROUTE_PREFIX + `/one/${id}`)).data
    }
    async getUserByEmail(email: string) {
        return (await api.get<UserShort>(this.ROUTE_PREFIX + `/email/${email}`)).data
    }
    async getUserByUsername(username: string) {
        return (await api.get<UserShort>(this.ROUTE_PREFIX + `/username/${username}`)).data
    }
}

export default new UserService()