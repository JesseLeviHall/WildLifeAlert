import { Router } from "express";
import * as resuerContent from "../controllers/rescuerContent.js";

import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";

export const rescuerRouter = Router();

rescuerRouter.get(
  "/rescuerPrefs",
  clerkAuth,
  clerkRouteHandler,
  resuerContent.rescuerPrefsContent
);
