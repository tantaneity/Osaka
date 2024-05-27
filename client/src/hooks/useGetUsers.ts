import { useQuery } from "@tanstack/react-query"

import UserService from "@/services/UserService"

export const useGetUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
})

export const useGetUserById = (id: number | undefined) => useQuery({
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
