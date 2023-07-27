import { Router } from "express";
import * as resuerContent from "../controllers/rescuerContent.js";
import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";
export const rescuerRouter = Router();
rescuerRouter.post("/newrescuer", clerkAuth, clerkRouteHandler, resuerContent.registerRescuer);
rescuerRouter.get("/welcomescreen", resuerContent.welcomeRescuerContent);
rescuerRouter.put("/updatewelcomecontent", resuerContent.updateWelcomeRescuerContent);
rescuerRouter.get("/rescuerprofile", clerkAuth, clerkRouteHandler, resuerContent.rescuerProfile);
rescuerRouter.post("/rescuerprefradius", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPrefRadius);
rescuerRouter.post("/rescuerprefnotifications", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPrefNotifications);
rescuerRouter.post("/updatepushtoken", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPushToken);
rescuerRouter.post("/rescuerpreflocation", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPrefLocation);
rescuerRouter.delete("/deleterescuer", clerkAuth, clerkRouteHandler, resuerContent.deleteRescuer);
//# sourceMappingURL=rescuerRoute.js.map