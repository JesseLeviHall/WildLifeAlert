import { Request, Response } from "express";
//import { redisClient } from "../app.js";


//GET /Home Screen.
export const homeScreenContent = async (req: Request, res: Response): Promise<void> => {
    res.send("homescreencontent")
};
