import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import UserService from "@/services/UserService"
import { UserUpdate } from "@/types/users/UserUpdate"

export const useGetUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
})

export const useGetUserById = (id: string | undefined) => useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id!),
    enabled: !!id
})

export const useGetUserByUsername = (username: string | undefined) => useQuery({
    queryKey: ["username", username],
    queryFn: () => UserService.getUserByUsername(username!),
    enabled: !!username
})

export const useGetUserByEmail = (email: string | undefined) => useQuery({
    queryKey: ["email", email],
    queryFn: () => UserService.getUserByEmail(email!),
    enabled: !!email
})

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['update-user'],
        mutationFn: ({ id, userData }: { id: string, userData: UserUpdate }) => UserService.updateUser(id, userData),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['user', id] })
        }
    })
}

export const useChangePassword = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['change-password'],
        mutationFn: ({id, currentPassword, newPassword}: {id: string, currentPassword:string, newPassword: string}) => UserService.changePassword(id, currentPassword, newPassword),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['user', id] })
        }
    })
}