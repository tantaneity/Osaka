import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api/ApiError'


export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({statusCode: err.statusCode, message: err.message, errors: err.errors})
    }
    res.status(500).json({message: err.message})
}