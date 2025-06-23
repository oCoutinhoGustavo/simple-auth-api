import { Router } from "express";

const router = Router();

router.get('/v1', (_req, res) => {
    res.send('v1!');
});

export default router;
