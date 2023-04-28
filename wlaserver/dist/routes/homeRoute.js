import { Router } from "express";
import * as homeScreenContent from "../controllers/homeScreenContent.js";
export const homeRouter = Router();
homeRouter.get("/homescreen", homeScreenContent.homeScreenContent);
//# sourceMappingURL=homeRoute.js.map