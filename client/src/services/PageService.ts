
import { api } from "@/api"
import { Page } from "@/types/admin/Page"

class PageService {
    private ROUTE_PREFIX = 'api/pages'

    async getPages(): Promise<Page[]> {
        const pages = (await api.get<Page[]>(this.ROUTE_PREFIX)).data
        return pages
    }

    async getPageById(pageId: string): Promise<Page> {
        const page = (await api.get<Page>(`${this.ROUTE_PREFIX}/${pageId}`)).data
        return page
    }

    async createPage(pageData: Page): Promise<Page> {
        const page = (await api.post<Page>(this.ROUTE_PREFIX, pageData)).data
        return page
    }

    async updatePage(pageId: string, pageData: Partial<Page>): Promise<Page> {
        const page = (await api.put<Page>(`${this.ROUTE_PREFIX}/${pageId}`, pageData)).data
        return page
    }

    async deletePage(pageId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${pageId}`)
    }

    async searchPagesByTitle(title: string): Promise<Page[]> {
        const pages = (await api.get<Page[]>(`${this.ROUTE_PREFIX}/search`, { params: { title } })).data
        return pages
    }
}

export default new PageService()
