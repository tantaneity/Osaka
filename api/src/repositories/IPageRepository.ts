import Page from "../models/common/admin/Page"

export interface IPageRepository {
    getPageById(pageId: number): Promise<Page | null>
    createPage(pageData: Page): Promise<Page>
    updatePage(pageId: number, pageData: Partial<Page>): Promise<Page | null>
    deletePage(pageId: number): Promise<boolean>
    getAllPages(): Promise<Page[]>
    getPagesByUserId(userId: number): Promise<Page[]>
    searchPagesByTitle(title: string): Promise<Page[]>
}