import { Router } from "express";
import * as controllerOne from "../controllers/controllerOne";

export const homeRouter = Router();

homeRouter.get("/homescreen", controllerOne.controllerOne);
