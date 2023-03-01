import { Router } from "express";
import rankingController from "../controllers/rankingController.js";

const router = Router();

router.get("/ranking", rankingController);

export default router;
