
import { Router } from "express";
import signUpRouters from "./signUpRouters.js";

const router = Router();

router.use(signUpRouters);

export default router;