import express from 'express';
import controller from '../controllers/controller';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/posts', controller.getPosts);
router.get('/post',auth.verifyToken, controller.findName);
router.get('/auth', controller.auth);

export default router;