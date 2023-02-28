import { Router } from "express";
import {
  urlShorten,
  getUrlById,
  openUrlByShortUrl,
} from "../controllers/urlsControllers.js";
import urlShortenMiddleware from "../middlewares/urlShortenMiddleware.js";

const router = Router();

router.post("/urls/shorten", urlShortenMiddleware, urlShorten);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openUrlByShortUrl);
export default router;
