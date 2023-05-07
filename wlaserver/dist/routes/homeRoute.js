import { Router } from "express";
import * as homeScreenContent from "../controllers/homeScreenContent.js";
export const homeRouter = Router();
homeRouter.get("/homescreen", homeScreenContent.homeScreenContent);
homeRouter.put("/updatehomecont", homeScreenContent.updateHomeScreenContent);
homeRouter.get("/publicmapscreen", homeScreenContent.publicMapContent);
homeRouter.put("/updatepublicmapcont", homeScreenContent.updatePublicMapContent);
//# sourceMappingURL=homeRoute.js.map