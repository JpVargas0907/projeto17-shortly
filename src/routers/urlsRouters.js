import { Router } from "express";
import { urlShorten } from "../controllers/urlsControllers.js";
import urlShortenMiddleware from "../middlewares/urlShortenMiddleware.js";

const router = Router();

router.post("/urls/shorten", urlShortenMiddleware, urlShorten);

export default router;
