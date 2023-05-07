import { Router } from "express";
import { homeRouter } from "./homeRoute.js";


export const api = Router();

api.use("/", homeRouter);
