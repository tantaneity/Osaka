export class ApiError extends Error {
    statusCode: number
    message: string
    errors: any[]
    constructor(statusCode: number, message: string, errors: any[] = []) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
    }
    toJSON(): any {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors
        }
    }
    static badRequest(message: string, errors: any[] = []): ApiError {
        return new ApiError(400, message, errors)
    }

    static unauthorized(message: string = 'User is unauthorized', errors: any[] = []): ApiError {
        return new ApiError(401, message, errors)
    }

    static forbidden(message: string, errors: any[] = []): ApiError {
        return new ApiError(403, message, errors)
    }

    static notFound(message: string, errors: any[] = []): ApiError {
        return new ApiError(404, message, errors)
    }

    static internalServerError(message: string, errors: any[] = []): ApiError {
        return new ApiError(500, message, errors)
    }
}