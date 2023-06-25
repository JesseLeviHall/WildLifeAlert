import { Router } from "express";
import { rescuerRouter } from "./rescuerRoute.js";

export const secureApi = Router();

secureApi.use("/", rescuerRouter);
