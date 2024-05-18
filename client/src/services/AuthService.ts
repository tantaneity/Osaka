import { api } from "@/api"
import { UserCreate } from "@/types/users/UserCreate"
import { AuthResponse } from "@/types/users/auth/AuthResponse"
import { UserShort } from "@/types/users/UserShort"
class AuthService {
    private ROUTE_PREFIX = '/users'

    async registrate(user: UserCreate) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/registration`, { 
            ...user
        })
        return response.data
    }
    async login(user: UserShort) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/login`, { ...user })
        return response.data
    }
    async logout() {
        await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/logout`)
    }
    async refresh() {
        const response = await api.get<AuthResponse>(`${this.ROUTE_PREFIX}/refresh`)
        return response.data
    }
}

export default new AuthService()