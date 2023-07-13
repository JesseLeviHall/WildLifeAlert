import { Router } from "express";
import * as dataContent from "../controllers/dataContent.js";
import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";

export const dataRouter = Router();

dataRouter.get(
  "/active-alert-area",
  clerkAuth,
  clerkRouteHandler,
  dataContent.getActiveAlertsInArea
);
