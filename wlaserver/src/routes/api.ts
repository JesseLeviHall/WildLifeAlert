import { Router } from "express";
import { homeRouter } from "./homeRoute";

export const api = Router();

api.use("/", homeRouter);