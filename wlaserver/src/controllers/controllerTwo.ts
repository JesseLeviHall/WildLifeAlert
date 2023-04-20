import { Request, Response } from "express";

//GET /Home Screen.
 
export const controllerTwo = async (req: Request, res: Response): Promise<void> => {
    res.send("Other Screen");
};