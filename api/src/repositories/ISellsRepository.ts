import Sells from "../models/common/products/Sells";

export interface ISellsRepository {
    getSellsById(sellsId: string): Promise<Sells | null>;
    createSells(sellsData: Sells): Promise<Sells>;
    updateSells(sellsId: string, sellsData: Partial<Sells>): Promise<Sells | null>;
    deleteSells(sellsId: string): Promise<boolean>;
    getAllSells(): Promise<Sells[]>;
    getSellsByProductId(productId: string): Promise<Sells[]>;
}
