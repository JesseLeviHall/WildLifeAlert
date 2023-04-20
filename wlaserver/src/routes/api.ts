import { Router } from "express";
import { homeRouter } from "./homeRoute";
import { otherRouter } from "./otherRoute";

export const api = Router();

api.use("/", homeRouter);
api.use('/', otherRouter);