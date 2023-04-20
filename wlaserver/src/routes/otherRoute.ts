import { Router } from "express";
import * as controllerTwo from "../controllers/controllerTwo";

export const otherRouter = Router();

otherRouter.get("/otherscreen", controllerTwo.controllerTwo);
