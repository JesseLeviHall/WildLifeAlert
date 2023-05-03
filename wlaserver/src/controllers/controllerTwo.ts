import { Request, Response } from "express";
import { redisClient } from '../services/db.setup.js';

export const updateHomeScreenContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Title, Description, Message } = req.body;
        const homescreencontent = JSON.stringify({ Title, Description, Message });
        await redisClient.set('homescreencontent', homescreencontent);
        res.send('Home Screen Content Updated');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


/* 

SET homescreencontent '{"Title":"","Description":"","Message":""}'

*/