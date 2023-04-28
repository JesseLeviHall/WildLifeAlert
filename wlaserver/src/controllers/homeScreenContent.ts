import { Request, Response } from "express";
import { redisClient } from "../app.js";


//GET /Home Screen.
export const homeScreenContent = async (req: Request, res: Response): Promise<void> => {
    const homeScreenContent = await redisClient.get("homeScreenContent");
    res.render("homeScreenContent", {
        homeScreenContent: homeScreenContent,
    });
};
