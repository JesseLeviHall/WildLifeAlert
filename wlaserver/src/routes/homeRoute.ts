import { Router } from "express";
import * as controllerOne from "../controllers/controllerOne.js";

export const homeRouter = Router();

homeRouter.get("/homescreen", controllerOne.controllerOne);
