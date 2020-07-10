import { apiResponse, checkParams } from "./../utils";
import { Router } from "express";
import Controller from "../controllers/url.controlller";
const controller = new Controller();
const router = Router();

router.post(
  "/",
  apiResponse.bind(null, async (req) => {
    const { url } = req?.body;
    checkParams(url);
    return controller.createNewShortURL(url);
  })
);

router.get(
  "/",
  apiResponse.bind(null, (req) => {
    const { limit, offset } = req?.query as any;
    return controller.listURLs(parseInt(limit), parseInt(offset));
  })
);

export default router;
