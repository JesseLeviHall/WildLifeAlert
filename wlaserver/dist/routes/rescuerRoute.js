import { Router } from "express";
import * as resuerContent from "../controllers/rescuerContent.js";
import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";
export const rescuerRouter = Router();
rescuerRouter.post("/newrescuer", resuerContent.registerRescuer);
rescuerRouter.get("/welcomescreen", clerkAuth, clerkRouteHandler, resuerContent.welcomeRescuerContent);
rescuerRouter.get("/rescuerprefs", clerkAuth, clerkRouteHandler, resuerContent.rescuerPrefsContent);
rescuerRouter.put("/updaterescuerprefs", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPrefs);
//# sourceMappingURL=rescuerRoute.js.map