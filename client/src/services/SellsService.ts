import { api } from "@/api";
import { Sells } from "@/types/shop/sells/Sells";

class SellsService {
    private ROUTE_PREFIX = 'api/sells';

    async getSellsById(sellsId: string): Promise<Sells> {
        const sells = (await api.get<Sells>(`${this.ROUTE_PREFIX}/${sellsId}`)).data;
        return sells;
    }

    async getSellsByProductId(productId: string): Promise<Sells[]> {
        const sells = (await api.get<Sells[]>(`${this.ROUTE_PREFIX}/product/${productId}`)).data;
        return sells;
    }

    async getAllSells(): Promise<Sells[]> {
        const sells = (await api.get<Sells[]>(this.ROUTE_PREFIX)).data;
        return sells;
    }

    async createSells(sellsData: Partial<Sells>): Promise<Sells> {
        const sells = (await api.post<Sells>(this.ROUTE_PREFIX, sellsData)).data;
        return sells;
    }

    async updateSells(sellsId: string, sellsData: Partial<Sells>): Promise<Sells> {
        const sells = (await api.put<Sells>(`${this.ROUTE_PREFIX}/${sellsId}`, sellsData)).data;
        return sells;
    }

    async deleteSells(sellsId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${sellsId}`);
    }
}

export default new SellsService();
