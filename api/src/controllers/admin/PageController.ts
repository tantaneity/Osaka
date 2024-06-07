import { NextFunction, Request, Response } from 'express'
import { PageService } from '../../services/PageService'
import { ApiError } from '../../errors/api/ApiError'
import Page from '../../models/common/admin/Page'

export class PageController {
    constructor(private readonly pageService: PageService) {}

    async getPageById(req: Request, res: Response, next: NextFunction) {
        try {
            const pageId = parseInt(req.params.id)
            const page = await this.pageService.getPageById(pageId)
            if (!page) {
                return next(ApiError.notFound('Page not found'))
            }
            res.json(page)
        } catch (error) {
            next(error)
        }
    }

    async createPage(req: Request, res: Response, next: NextFunction) {
        try {
            const pageData: Page = req.body
            const page = await this.pageService.createPage(pageData)
            res.json(page)
        } catch (error) {
            next(error)
        }
    }

    async updatePage(req: Request, res: Response, next: NextFunction) {
        try {
            const pageId = parseInt(req.params.id)
            const pageData: Partial<Page> = req.body
            const updatedPage = await this.pageService.updatePage(pageId, pageData)
            if (!updatedPage) {
                return next(ApiError.notFound('Page not found'))
            }
            res.json(updatedPage)
        } catch (error) {
            next(error)
        }
    }

    async deletePage(req: Request, res: Response, next: NextFunction) {
        try {
            const pageId = parseInt(req.params.id)
            const result = await this.pageService.deletePage(pageId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getAllPages(req: Request, res: Response, next: NextFunction) {
        try {
            const pages = await this.pageService.getAllPages()
            res.json(pages)
        } catch (error) {
            next(error)
        }
    }

    async getPagesByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId)
            const pages = await this.pageService.getPagesByUserId(userId)
            res.json(pages)
        } catch (error) {
            next(error)
        }
    }

    async searchPagesByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.query.title as string
            const pages = await this.pageService.searchPagesByTitle(title)
            res.json(pages)
        } catch (error) {
            next(error)
        }
    }
}
