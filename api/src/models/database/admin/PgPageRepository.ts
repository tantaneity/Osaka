import { Repository, Like } from 'typeorm'
import { PageEntity } from '../../entities/PageEntity'
import { IPageRepository } from '../../../repositories/IPageRepository'
import { AppDataSource } from '../../../config/data-source'
import Page from '../../common/admin/Page'
import { PageMapper } from '../../mappers/PageMapper'


export class PgPageRepository implements IPageRepository {
    
    private readonly pageRepository: Repository<PageEntity>

    constructor() {
        this.pageRepository = AppDataSource.getRepository(PageEntity)
    }

    async getPageById(pageId: number): Promise<Page | null> {
        const page = await this.pageRepository.findOne({where: {id: pageId}, relations: ['user']})
        return page ? PageMapper.fromPageEntityToPage(page) : null
    }

    async createPage(pageData: Page): Promise<Page> {
        const newPage = this.pageRepository.create(pageData)
        const savedPage = await this.pageRepository.save(newPage)
        return PageMapper.fromPageEntityToPage(savedPage)
    }

    async updatePage(pageId: number, pageData: Partial<Page>): Promise<Page | null> {
        const page = await this.pageRepository.findOne({where: {id: pageId}, relations: ['user']})
        if (!page) return null

        Object.assign(page, pageData)
        await this.pageRepository.save(page)
        return PageMapper.fromPageEntityToPage(page)
    }

    async deletePage(pageId: number): Promise<boolean> {
        const page = await this.pageRepository.findOne({where: {id: pageId}, relations: ['user']})
        if (!page) return false

        await this.pageRepository.remove(page)
        return true
    }

    async getAllPages(): Promise<Page[]> {
        const pages = await this.pageRepository.find({
            relations: ['user']
        })
        return pages.map(page => PageMapper.fromPageEntityToPage(page))
    }

    async getPagesByUserId(userId: number): Promise<Page[]> {
        const pages = await this.pageRepository.find({ where: { userId }, relations: ['user'] })
        return pages.map(page => PageMapper.fromPageEntityToPage(page))
    }

    async searchPagesByTitle(title: string): Promise<Page[]> {
        const pages = await this.pageRepository.find({ where: { title: Like(`%${title}%`) }, relations: ['user'] })
        return pages.map(page => PageMapper.fromPageEntityToPage(page))
    }

}
