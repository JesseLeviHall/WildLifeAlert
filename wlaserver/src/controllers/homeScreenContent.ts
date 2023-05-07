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

//POST /Home Screen.
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


//GET /Public Map Screen.
export const publicMapContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const publicmapcontent = await redisClient.get('publicmapcontent');
        res.send(publicmapcontent);
    }
    catch (error) {
        console.error(error);
    }
};

//POST /Public Map Screen.
export const updatePublicMapContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Title, Description, Message } = req.body;
        const publicmapcontent = JSON.stringify({ Title, Description, Message });
        await redisClient.set('publicmapcontent', publicmapcontent);
        res.send('Public Map Content Updated');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
/*
SET publicmapcontent '{"Title":"","Description":"","Message":""}'
*/