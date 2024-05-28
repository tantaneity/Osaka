import { UserShort } from "@/types/users/UserShort";
import { create } from "zustand";
import AuthService from "@/services/AuthService";
import { UserReg } from "@/types/users/auth/UserReg";
import { UserLogin } from "@/types/users/auth/UserLogin";

interface UserState {
    user: UserShort | null;
    isAuth: boolean;
    isLoading: boolean;
    setUser: (user: UserShort) => void;
    setIsAuth: (value: boolean) => void;
    registrate: (data: UserReg) => void;
    login: (data: UserLogin) => void;
    logout: () => void;
    checkAuth: () => void;
}
const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuth: false,
    isLoading: true,

    setUser: (user) => {
        console.log("Setting user:", user);
        set({ user })
    },
    setIsAuth: (value) => {
        set({ isAuth: value })
    },
    setIsLoading: (value: boolean) => {
        set({ isLoading: value })
    },

    registrate: async (data) => {
        try {
            const response = await AuthService.registrate(data)
            localStorage.setItem("accessToken", response.tokens.accessToken)
        } catch (e) {
            console.log(e)
        }
    },
    login: async (data) => {
        try {
            const response = await AuthService.login(data)

            localStorage.setItem("accessToken", response.tokens.accessToken)
            
            set({ user: response.user, isAuth: true })
            
        } catch(e: any) {
            console.log(e)
            
            
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        await AuthService.logout()
        localStorage.removeItem('accessToken')

        set({ user: null, isAuth: false })
    },
    checkAuth: async () => {
        try {
            const response = await AuthService.refresh()

            localStorage.setItem('accessToken', response.tokens.accessToken)
            console.log(response.user)
            set({ user: response.user, isAuth: true })
        } catch(e) {
            console.log(e)
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useUserStore