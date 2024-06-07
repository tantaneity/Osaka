import User from "../users/User"

export default interface Page {
    id: number
    title: string
    description: string
    dateCreated: Date
    user: User
}