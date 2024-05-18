import Cart from "../common/shopping/cart/Cart";
import CartItem from "../common/shopping/cart/CartItem";
import { CartEntity } from "../entities/CartEntity";
import { CartItemEntity } from "../entities/CartItemEntity";
import { ProductMapper } from "./ProductMapper";
import { UserMapper } from "./UserMapper";

export class CartMapper {
    static fromCartEntityToCart(cartEntity: CartEntity): Cart {
        return {
            id: cartEntity.id,
            user: UserMapper.fromUserEntityToUser(cartEntity.user),
            items: cartEntity.items.map(item => this.fromCartItemEntityToCartItem(item)),
            dateCreated: cartEntity.dateCreated,
            dateModified: cartEntity.dateModified
        }
    }

    static fromCartItemEntityToCartItem(cartItemEntity: CartItemEntity): CartItem {
        return {
            id: cartItemEntity.id,
            cart: this.fromCartEntityToCart(cartItemEntity.cart),
            product: ProductMapper.fromProductEntityToProduct(cartItemEntity.product),
            quantity: cartItemEntity.quantity
        }
    }

}