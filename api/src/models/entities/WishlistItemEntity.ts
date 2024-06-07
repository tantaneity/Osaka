import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { ProductEntity } from './ProductEntity';

@Entity({ name: 'wishlist_items' })
export class WishlistItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.wishlistItems)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, product => product.wishlistItems)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;
}
