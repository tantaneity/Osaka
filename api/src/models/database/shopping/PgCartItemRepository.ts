import { Repository } from 'typeorm';
import { ApiError } from '../../../errors/api/ApiError';
import { AppDataSource } from '../../../config/data-source';
import { ICartItemRepository } from '../../../repositories/ICartItemRepository';
import { CartItemEntity } from '../../entities/CartItemEntity';
import CartItem from '../../common/shopping/cart/CartItem';
import { CartMapper } from '../../mappers/CartMapper';

export class PgCartItemRepository implements ICartItemRepository {
    private readonly cartItemRepository: Repository<CartItemEntity>;

    constructor() {
        this.cartItemRepository = AppDataSource.getRepository(CartItemEntity);
    }

    async getCartItemById(cartItemId: string): Promise<CartItem | null> {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId }, relations: ['cart', 'product'] });
        return cartItem ? CartMapper.fromCartItemEntityToCartItem(cartItem) : null;
    }

    async createCartItem(cartItemData: CartItem): Promise<CartItem> {
        const { cart, product, quantity } = cartItemData;
        let cartItem = await this.cartItemRepository.findOne({ where: { cart: { id: cart.id }, product: { id: product.id } }, relations: ['cart', 'product'] });
    
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem = await this.cartItemRepository.save(cartItem);
        } else {
            const newCartItem = this.cartItemRepository.create({
                cart: { id: cart.id },
                product: { id: product.id },
                quantity
            });
            cartItem = await this.cartItemRepository.save(newCartItem);
        }
        
        return CartMapper.fromCartItemEntityToCartItem(cartItem);
    }
    

    async updateCartItem(cartItemId: string, cartItemData: Partial<CartItem>): Promise<CartItem | null> {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId }, relations: ['cart', 'product'] });
        if (!cartItem) {
            throw ApiError.notFound('CartItem not found');
        }
        Object.assign(cartItem, cartItemData);
        const updatedCartItem = await this.cartItemRepository.save(cartItem);
        return CartMapper.fromCartItemEntityToCartItem(updatedCartItem);
    }

    async deleteCartItem(cartItemId: string): Promise<boolean> {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId }, relations: ['cart', 'product'] });
        if (!cartItem) {
            throw ApiError.notFound('CartItem not found');
        }
        await this.cartItemRepository.remove(cartItem);
        return true;
    }

    async getAllCartItems(): Promise<CartItem[]> {
        const cartItems = await this.cartItemRepository.find({relations: ['cart', 'product']});
        return cartItems.map(cartItem => CartMapper.fromCartItemEntityToCartItem(cartItem));
    }

    async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
        const cartItems = await this.cartItemRepository.find({ where: { cart: {
            id: cartId
        } }, relations: ['cart', 'product', 'product.images', 'product.images.product'] });
        return cartItems.map(cartItem => CartMapper.fromCartItemEntityToCartItem(cartItem));
    }
}
