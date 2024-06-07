import { api } from "@/api"
import { UserCreate } from "@/types/users/UserCreate"
import { AuthResponse } from "@/types/users/auth/AuthResponse"
import { UserLogin } from "@/types/users/auth/UserLogin"

class AuthService {
    private ROUTE_PREFIX = 'api/users'

    async registrate(user: UserCreate) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/registration`, { 
            ...user
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new Error('Failed to register user')
        }
    }

    async login(user: UserLogin) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/login`, { ...user })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new Error('Failed to log in user')
        }
    }

    async logout() {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/logout`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new Error('Failed to log out user')
        }
    }

    async refresh() {
        const response = await api.get<AuthResponse>(`${this.ROUTE_PREFIX}/refresh`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new Error('Failed to refresh token')
        }
    }
}

export default new AuthService()
