import { Router } from "express";
import * as resuerContent from "../controllers/rescuerContent.js";

export const rescuerRouter = Router();

rescuerRouter.get("/rescuerPrefs", resuerContent.rescuerPrefsContent);
