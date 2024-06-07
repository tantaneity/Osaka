import { UserShort } from "@/types/users/UserShort"
import { api } from "@/api"
import { UserDetail } from "@/types/users/UserDetail"
import { UserUpdate } from "@/types/users/UserUpdate"

class UserService {
    private ROUTE_PREFIX = 'api/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.ROUTE_PREFIX)).data
        return users
    }
    async getUserById(id: string) {
        return (await api.get<UserDetail>(this.ROUTE_PREFIX + `/one/${id}`)).data
    }
    async getUserByEmail(email: string) {
        return (await api.get<UserDetail>(this.ROUTE_PREFIX + `/email/${email}`)).data
    }
    async getUserByUsername(username: string) {
        return (await api.get<UserDetail>(this.ROUTE_PREFIX + `/username/${username}`)).data
    }
    async updateUser(id: string, userData: UserUpdate): Promise<UserDetail> {
        return (await api.put<UserDetail>(`${this.ROUTE_PREFIX}/update/${id}`, userData)).data
    }
    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
        await api.post(`${this.ROUTE_PREFIX}/change-password/${userId}`, {
            currentPassword,
            newPassword
        });
    }
}

export default new UserService()