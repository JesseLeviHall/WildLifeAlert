import { Request, Response } from 'express';
import { redisClient } from '../services/db.setup.js';
import { promisify } from 'util';


//GET /Home Screen.
export const homeScreenContent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const homescreencontent = await redisClient.get('homescreencontent');
		res.send(homescreencontent);
	} catch (error) {
		console.error(error);
	}
};

//POST /Home Screen.
export const updateHomeScreenContent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { Title, Description, Message } = req.body;
		const homescreencontent = JSON.stringify({ Title, Description, Message });
		await redisClient.set('homescreencontent', homescreencontent);
		res.send('Home Screen Content Updated');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
/* 
SET homescreencontent '{"Title":"","Description":"","Message":""}'
*/

//GET /Public Map Screen.
export const publicMapContent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const publicmapcontent = await redisClient.get('publicmapcontent');
		res.send(publicmapcontent);
	} catch (error) {
		console.error(error);
	}
};

//POST /Public Map Screen.
export const updatePublicMapContent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { Title, Description, Message } = req.body;
		const publicmapcontent = JSON.stringify({ Title, Description, Message });
		await redisClient.set('publicmapcontent', publicmapcontent);
		res.send('Public Map Content Updated');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
/*
SET publicmapcontent '{"Title":"","Description":"","Message":""}'
*/


//GET /Public Map GeoPos.
export const publicMapGeoPos = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		//timestamp of current moment
		const now = Math.floor(Date.now() / 1000);
		//timestamp of 48 hours ago
		const minus48h = now - 48 * 60 * 60;
		//get array of alert ids from the last 48 hours
		const alertIds = await redisClient.zRangeByScore('alerts:animals:timestamps', minus48h.toString(), '+inf');
		// Reverse the array to get the most recent alerts first
		alertIds.reverse();
		const alerts = [];
		//for each alert id, get geoposition
		for (const id of alertIds) {
			const data = await redisClient.hGetAll(`alerts:animals:${id}`);
			const { Latitude: lat, Longitude: lon } = data;
			//add to alerts array
			alerts.push({
				id,
				position: [lat, lon],
			});
		}
		res.send(alerts);
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while fetching alert locations.');
	}
};


/*
//POST New Alert
export const newAlert = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { FullName, Latitude, Longitude, Photo, PhoneNumber, Animal, Description, Email } = req.body;
        // Assume 'Photo' is an array of photo URLs
        const photoUrlsString = JSON.stringify(Photo); // Serialize array to JSON string
        const timestamp = Math.floor(Date.now() / 1000);
        const id = await redisClient.incr('alerts:animals:nextid');
        
        await redisClient.hSet(
            `alerts:animals:${id}`, 
            'FullName', FullName, 
            'Latitude', Latitude, 
            'Longitude', Longitude, 
            'Photo', photoUrlsString, // Store serialized photo URLs
            'PhoneNumber', PhoneNumber, 
            'Animal', Animal, 
            'Description', Description, 
            'Email', Email, 
            'Timestamp', timestamp
        );
        
        await redisClient.zAdd('alerts:animals:timestamps', timestamp, id);
        
        res.send('New Alert Created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

*/


