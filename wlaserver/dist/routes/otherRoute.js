import { Router } from "express";
import * as controllerTwo from "../controllers/controllerTwo.js";
export const otherRouter = Router();
otherRouter.put("/updatehomecont", controllerTwo.updateHomeScreenContent);
//# sourceMappingURL=otherRoute.js.map