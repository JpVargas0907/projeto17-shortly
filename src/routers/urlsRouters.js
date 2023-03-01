import { Router } from "express";
import {
  urlShorten,
  getUrlById,
  openUrlByShortUrl,
  deleteUrl,
} from "../controllers/urlsControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import urlShortenMiddleware from "../middlewares/urlShortenMiddleware.js";

const router = Router();

router.post("/urls/shorten", urlShortenMiddleware, authMiddleware, urlShorten);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openUrlByShortUrl);
router.delete("/urls/:id", authMiddleware, deleteUrl);

export default router;
