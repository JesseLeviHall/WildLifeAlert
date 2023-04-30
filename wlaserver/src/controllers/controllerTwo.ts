import { Request, Response } from "express";

//GET /other screen.
 
export const controllerTwo = async (req: Request, res: Response): Promise<void> => {
    res.send("Other Screen");
};