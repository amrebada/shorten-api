import { Router } from "express";
import URLRouter from "./url.route";

const router = Router();

//url endpoints
router.use("/url", URLRouter);

export default router;
