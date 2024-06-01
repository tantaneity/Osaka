import { Repository } from 'typeorm';
import { WishlistItemEntity } from '../../entities/WishlistItemEntity';
import { IWishlistItemRepository } from '../../../repositories/IWishlistItemRepository';
import { AppDataSource } from '../../../config/data-source';
import { WishlistItem } from '../../common/shopping/WishlistItem';
import { WishlistItemMapper } from '../../mappers/WishlistItemMapper';

export class PgWishlistItemRepository implements IWishlistItemRepository {
    private readonly wishlistItemRepository: Repository<WishlistItemEntity>;

    constructor() {
        this.wishlistItemRepository = AppDataSource.getRepository(WishlistItemEntity);
    }

    async getWishlistItemsByUserId(userId: string): Promise<WishlistItem[]> {
        const wishlistItems = await this.wishlistItemRepository.find({ where: { user: {id: userId} }, relations: ['product', 'user'] });
        return wishlistItems.map(item => WishlistItemMapper.fromWishlistItemEntityToWishlistItem(item));
    }

    async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
        const newItem = this.wishlistItemRepository.create({user: {id: userId}, product: {id: productId}})
        const savedItem = await this.wishlistItemRepository.save(newItem);
        return WishlistItemMapper.fromWishlistItemEntityToWishlistItem(savedItem);
    }

    async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
        const result = await this.wishlistItemRepository.delete({ user: {id: userId}, product: {id: productId} });
        return !!result.affected && result.affected > 0;
    }
}
