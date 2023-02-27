import { Router } from "express";
import signUpRouters from "./signUpRouters.js";
import signInRouters from "./signInRouters.js";

const router = Router();

router.use(signUpRouters);
router.use(signInRouters);

export default router;
