import { Express } from "express";
import {getPosts} from '../controllers/admin.controller';
import * as auth from '../middleware/auth';
const initializeRoutes = (app: Express) => {
    app.get('/posts', getPosts);
}

// router.get('/post',
//     auth.verifyFromEmployee, 
//     controller.findName);
// router.get('/auth', controller.auth);

export default initializeRoutes;