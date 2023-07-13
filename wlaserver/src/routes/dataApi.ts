import { Router } from "express";
import { dataRouter } from "./dataRoute.js";

export const dataApi = Router();

dataApi.use("/", dataRouter);
