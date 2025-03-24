import { Express } from "express";
import users from '../routes/v1/user.routes';
const initializeRoutes = (app: Express) => {
    app.use("/v1", users);
}

// router.get('/post',
//     auth.verifyFromEmployee, 
//     controller.findName);
// router.get('/auth', controller.auth);

export default initializeRoutes;