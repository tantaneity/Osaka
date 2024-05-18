import { UserShort } from "../UserShort";
import { Tokens } from "./Tokens";
export interface AuthResponse {
    user: UserShort
    tokens: Tokens
}