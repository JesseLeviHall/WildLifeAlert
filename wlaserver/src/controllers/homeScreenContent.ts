import { Request, Response } from "express";
import { redisClient } from '../services/db.setup.js';


//GET /Home Screen.
export const homeScreenContent = async (req: Request, res: Response): Promise<void> => {
    try {
       const homescreencontent = await redisClient.get('homescreencontent');
         res.send(homescreencontent);
    }
    catch (error) {
        console.error(error);
    }
};
