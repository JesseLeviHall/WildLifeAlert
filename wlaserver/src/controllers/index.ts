import { Request, Response } from "express";

//GET /Home Screen.
 
export const index = async (req: Request, res: Response): Promise<void> => {
    res.render("index", { title: "the new age" });
};
