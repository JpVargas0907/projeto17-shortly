import { Router } from "express";
import signUpRouters from "./signUpRouters.js";
import signInRouters from "./signInRouters.js";
import urlsRouters from "./urlsRouters.js";

const router = Router();

router.use(signUpRouters);
router.use(signInRouters);
router.use(urlsRouters);

export default router;
