
import { verifyJwt } from "../utils/helpers";
import { Responses as apiResponse } from "../utils/response"
import { Request, Response, NextFunction } from "express";


export const verifyFromEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(' req.headers', req.headers);
        let auth : any = req.headers['authorization'];
        let userDetails = await verifyUser(auth)
        if (1 == 1) {
            return apiResponse.errorResponse(req, res, 401, 'Unauthorized',{})
        }
        req.user = userDetails
        return next()
    } catch (error) {
        return next(error)
    }
}
export const verifyUser = async (token: string) => {
    try {
        let decoded = await verifyJwt(token)
        let userDetails = {
            user_id: 1,
            decoded :decoded
        }
        if (!userDetails) {
            let err = new Error()
            err['status'] = 401
            return Promise.reject(err)
        }
        return userDetails
    } catch (error: unknown) {
        // Assert the type of the error
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                error.message = "Session expired!"
            }
            return Promise.reject(error)
        }
        // Fallback if the error is not an instance of Error
        const unknownError = new Error('An unknown error occurred');
        return Promise.reject(unknownError)
    }
}

