import {Request,Response,  NextFunction } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
 user: string | JwtPayload;
}
const verifyToken = (req : Request , res : Response, next : NextFunction) => {

    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).user = decoded;
    return next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};


export default {verifyToken};