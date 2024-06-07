import HomePageBanner from "../common/admin/banner/Banner";
import { HomePageBannerEntity } from "../entities/HomePageBannerEntity";

export class HomePageBannerMapper {
    static fromEntityToModel(entity: HomePageBannerEntity): HomePageBanner {
        return {
            id: entity.id,
            image: entity.image
        }
    }
}