import { Router } from "express";
import { homeRouter } from "./homeRoute.js";
import { otherRouter } from "./otherRoute.js";
export const api = Router();
api.use("/", homeRouter);
api.use('/', otherRouter);
//# sourceMappingURL=api.js.map