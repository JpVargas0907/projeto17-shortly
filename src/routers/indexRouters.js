import { Router } from "express";
import signUpRouters from "./signUpRouters.js";
import signInRouters from "./signInRouters.js";
import urlsRouters from "./urlsRouters.js";
import userRouters from "./userRouters.js";
import rankingRouter from "./rankingRouter.js";

const router = Router();

router.use(signUpRouters);
router.use(signInRouters);
router.use(urlsRouters);
router.use(userRouters);
router.use(rankingRouter);

export default router;
