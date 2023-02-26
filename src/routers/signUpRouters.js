import { Router } from 'express';

const router = Router();

router.post("/signup", registerUser);

export default router;