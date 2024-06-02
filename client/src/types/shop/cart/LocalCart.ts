import { UserShort } from "@/types/users/UserShort";
import { LocalCartItem } from "./LocalCartItem";

export interface LocalCart {
    id: string;
    items: LocalCartItem[];
    user?: UserShort | null;
    dateCreated: Date;
    dateModified: Date;
}