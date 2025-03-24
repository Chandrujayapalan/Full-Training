import express from "express";
const userRoutes = express.Router();
import { getPosts } from "../../controllers/admin.controller";
import { verifyFromEmployee } from "../../middleware/auth";

// account api    
userRoutes.get("/posts",
    // verifyFromEmployee,
     getPosts);

export default userRoutes;
