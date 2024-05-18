import { ISellsRepository } from '../repositories/ISellsRepository';
import Sells from '../models/common/products/Sells';
import { ApiError } from '../errors/api/ApiError';

export class SellsService {
    constructor(private readonly sellsRepository: ISellsRepository) {}

    async getSellsById(sellsId: string): Promise<Sells | null> {
        return await this.sellsRepository.getSellsById(sellsId);
    }

    async createSells(sellsData: Sells): Promise<Sells> {
        return await this.sellsRepository.createSells(sellsData);
    }

    async updateSells(sellsId: string, sellsData: Partial<Sells>): Promise<Sells | null> {
        return await this.sellsRepository.updateSells(sellsId, sellsData);
    }

    async deleteSells(sellsId: string): Promise<boolean> {
        return await this.sellsRepository.deleteSells(sellsId);
    }

    async getAllSells(): Promise<Sells[]> {
        return await this.sellsRepository.getAllSells();
    }

    async getSellsByProductId(productId: string): Promise<Sells[]> {
        return await this.sellsRepository.getSellsByProductId(productId);
    }
}
