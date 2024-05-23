import { PageEntity } from "../entities/PageEntity";
import Page from "../common/admin/Page";
import { UserMapper } from "./UserMapper";

export class PageMapper {
    static fromPageEntityToPage(pageEntity: PageEntity): Page {
        return {
            id: pageEntity.id,
            title: pageEntity.title,
            description: pageEntity.description,
            dateCreated: pageEntity.dateCreated,
            user: UserMapper.fromUserEntityToUser(pageEntity.user)
        }
    }
}