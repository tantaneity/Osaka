import Sells from "../common/products/Sells";
import { SellEntity } from "../entities/SellEntity";
import { ProductMapper } from "./ProductMapper";

export class SellMapper {
    static fromSellEntityToSell(entitie: SellEntity): Sells {
        return {
            id: entitie.id,
            product: ProductMapper.fromProductEntityToProduct(entitie.product),
            price: entitie.price,
            quantity: entitie.quantity
        }
    }
}