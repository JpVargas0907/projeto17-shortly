import { Router } from 'express';
import { registerUser } from '../controllers/signUpController.js';
import validateUser from '../middlewares/signUpMiddleware.js';

const router = Router();

router.post("/signup", validateUser, registerUser);

export default router;