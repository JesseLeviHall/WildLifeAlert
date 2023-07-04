import { Router } from "express";
import * as resuerContent from "../controllers/rescuerContent.js";
import { clerkAuth, clerkRouteHandler } from "../middlewares/clerkAuth.js";
export const rescuerRouter = Router();
rescuerRouter.post("/newrescuer", clerkAuth, clerkRouteHandler, resuerContent.registerRescuer);
rescuerRouter.get("/welcomescreen", clerkAuth, clerkRouteHandler, resuerContent.welcomeRescuerContent);
rescuerRouter.put("/updatewelcomecontent", resuerContent.updateWelcomeRescuerContent);
rescuerRouter.get("/rescuerprofile", clerkAuth, clerkRouteHandler, resuerContent.rescuerProfile);
rescuerRouter.get("/rescuerprefs", clerkAuth, clerkRouteHandler, resuerContent.rescuerPrefsContent);
rescuerRouter.put("/updaterescuerprefs", clerkAuth, clerkRouteHandler, resuerContent.updateRescuerPrefs);
//# sourceMappingURL=rescuerRoute.js.map