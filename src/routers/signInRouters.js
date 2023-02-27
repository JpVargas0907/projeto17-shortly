import { Router } from "express";
import { signIn } from "../controllers/signInController.js";
import validateLogin from "../middlewares/signInMiddleware.js";

const router = Router();

router.post("/signin", validateLogin, signIn);

export default router;
