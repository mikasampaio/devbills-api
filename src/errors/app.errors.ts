import { StatusCodes } from 'http-status-codes'

export class AppError {
    public statusCode: StatusCodes;
    public message: string | string[];

    constructor(message: string | string[], statusCode: number) {
        this.message = message

        this.statusCode = statusCode
    }
}