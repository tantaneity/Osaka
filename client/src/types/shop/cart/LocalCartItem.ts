import { Product } from "@/types/products/Product";

export interface LocalCartItem {
    id: string;
    product: {
        id: string;
    } | Product
    quantity: number;
}