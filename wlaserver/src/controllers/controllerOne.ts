import { Request, Response } from "express";

//GET /Home Screen.
 
export const controllerOne = async (req: Request, res: Response): Promise<void> => {
    res.send("Home Screen");
};