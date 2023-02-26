import { Router } from 'express';
import { registerUser } from '../controllers/signUpController';
import validateUser from '../middlewares/signUpMiddleware';

const router = Router();

router.post("/signup", validateUser, registerUser);

export default router;