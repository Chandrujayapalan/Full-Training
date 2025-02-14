import { Request, Response, NextFunction } from 'express';
const sad = []
import jwt from 'jsonwebtoken'
import db from '../modelssss';
const {User } = db
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('db.User',User);
        let user: any = await db.User.findAll()
        return res.status(200).json({
            data: user
        });
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({
            message: error.message
        });

    }

};
// const createPost = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let user  = {
//             name :req.body.name,
//             age  : req.body.age
//         }
// user = User.create(user)

//         return res.status(200).json({
//             message : "data added succefully",
//             data: user
//         });
//     } catch (error) {

//     return res.status(400).json({
//       message : error  
//     });
//     }
// };
const findName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = sad.map((a: any) => a)
        return res.status(200).json({
            message: "data added succefully",
            data: user

        });
    } catch (error) {

        return res.status(400).json({
            message: error
        });
    }
};
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = jwt.sign({
            userId: "dasdsa"
        }, 'your-secret-key-here', { expiresIn: 60 * 60 });
        return res.status(200).json({
            message: "data added succefully",
            data: user

        });
    } catch (error) {

        return res.status(400).json({
            message: error
        });
    }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = jwt.sign({
            userId: "dasdsa"
        }, 'your-secret-key-here', { expiresIn: 60 * 60 });
        return res.status(200).json({
            message: "data added succefully",
            data: user

        });
    } catch (error) {

        return res.status(400).json({
            message: error
        });
    }
};
export default { getPosts, findName, auth };