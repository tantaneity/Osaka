import { IPageRepository } from '../repositories/IPageRepository'
import { ApiError } from '../errors/api/ApiError'
import Page from '../models/common/admin/Page'

export class PageService {
    constructor(private readonly pageRepository: IPageRepository) {}

    async getPageById(pageId: number): Promise<Page | null> {
        const page = await this.pageRepository.getPageById(pageId)
        if (!page) {
            throw ApiError.notFound("Page not found")
        }
        return page
    }

    async createPage(pageData: Page): Promise<Page> {
        return await this.pageRepository.createPage(pageData)
    }

    async updatePage(pageId: number, pageData: Partial<Page>): Promise<Page | null> {
        const page = await this.pageRepository.getPageById(pageId)
        if (!page) {
            throw ApiError.notFound("Page not found")
        }
        return await this.pageRepository.updatePage(pageId, pageData)
    }

    async deletePage(pageId: number): Promise<boolean> {
        const page = await this.pageRepository.getPageById(pageId)
        if (!page) {
            throw ApiError.notFound("Page not found")
        }
        return await this.pageRepository.deletePage(pageId)
    }

    async getAllPages(): Promise<Page[]> {
        return await this.pageRepository.getAllPages()
    }

    async getPagesByUserId(userId: number): Promise<Page[]> {
        return await this.pageRepository.getPagesByUserId(userId)
    }

    async searchPagesByTitle(title: string): Promise<Page[]> {
        return await this.pageRepository.searchPagesByTitle(title)
    }
}
