import { UserShort } from "../users/UserShort"

export interface Page {
    id: number
    title: string,
    description: string
    dateCreated: Date
    user: UserShort
}