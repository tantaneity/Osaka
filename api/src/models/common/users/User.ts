export default interface User {
    id: string
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
    description: string
    profileImage: Buffer
    registrationDate: Date
}