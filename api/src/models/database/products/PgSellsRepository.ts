import { Repository } from 'typeorm';
import { SellEntity } from '../../entities/SellEntity';
import { ISellsRepository } from '../../../repositories/ISellsRepository';
import { AppDataSource } from '../../../config/data-source';
import Sells from '../../common/products/Sells';
import { SellMapper } from '../../mappers/SellMapper';
import { ApiError } from '../../../errors/api/ApiError';

export class PgSellsRepository implements ISellsRepository {
    private readonly sellsRepository: Repository<SellEntity>;

    constructor() {
        this.sellsRepository = AppDataSource.getRepository(SellEntity);
    }

    async getSellsById(sellsId: string): Promise<Sells | null> {
        const sells = await this.sellsRepository.findOne({
            where: {
            id:sellsId
        }});
        return sells ? SellMapper.fromSellEntityToSell(sells) : null;
    }

    async createSells(sellsData: Sells): Promise<Sells> {
        const {product, price, quantity} = sellsData;
        const newSells = this.sellsRepository.create({
            product:{
                id:product.id,
            },
            price,quantity
        });
        const savedSells = await this.sellsRepository.save(newSells);
        return SellMapper.fromSellEntityToSell(savedSells);
    }

    async updateSells(sellsId: string, sellsData: Partial<Sells>): Promise<Sells | null> {
        const sells = await this.sellsRepository.findOne({where: {id:sellsId}});
        if (!sells) {
            throw ApiError.notFound('Sells not found');
        }
        Object.assign(sells, sellsData);
        await this.sellsRepository.save(sells);
        return SellMapper.fromSellEntityToSell(sells);
    }

    async deleteSells(sellsId: string): Promise<boolean> {
        const sells = await this.sellsRepository.findOne({where:{id:sellsId}});
        if (!sells) {
            throw ApiError.notFound('Sells not found');
        }
        await this.sellsRepository.remove(sells);
        return true;
    }

    async getAllSells(): Promise<Sells[]> {
        const allSells = await this.sellsRepository.find({relations:['product']});
        return allSells.map(sells => SellMapper.fromSellEntityToSell(sells));
    }

    async getSellsByProductId(productId: string): Promise<Sells[]> {
        const sellsByProduct = await this.sellsRepository.find({ where: { product: {id: productId} } });
        return sellsByProduct.map(sells => SellMapper.fromSellEntityToSell(sells));
    }
}
