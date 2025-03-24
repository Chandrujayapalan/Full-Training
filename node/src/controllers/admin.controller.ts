import { Request, Response, NextFunction } from 'express';
import { getUser } from '../service/user.service';
export async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        let users: any = await getUser({}, true, true, false)
        return res.status(200).json({
            data: users
        });
    } catch (error: any) {
            next(error)
    }

};
