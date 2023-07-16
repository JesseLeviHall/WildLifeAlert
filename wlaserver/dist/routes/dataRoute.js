import { Router } from "express";
import * as dataContent from "../controllers/dataContent.js";
import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";
export const dataRouter = Router();
dataRouter.get("/active-alert-radius", clerkAuth, clerkRouteHandler, dataContent.getActiveAlertsInArea);
dataRouter.get("/total-active-alerts", clerkAuth, clerkRouteHandler, dataContent.getTotalAlerts);
dataRouter.get("/alert-details/:alertId", clerkAuth, clerkRouteHandler, dataContent.getAlertDetails);
//# sourceMappingURL=dataRoute.js.map