import { redisClient } from '../services/db.setup.js';
import { promisify } from 'util';
//GET /Home Screen.
export const homeScreenContent = async (req, res) => {
    try {
        const homescreencontent = await redisClient.get('homescreencontent');
        res.send(homescreencontent);
    }
    catch (error) {
        console.error(error);
    }
};
//POST /Home Screen.
export const updateHomeScreenContent = async (req, res) => {
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
};
/*
SET homescreencontent '{"Title":"","Description":"","Message":""}'
*/
//GET /Public Map Screen.
export const publicMapContent = async (req, res) => {
    try {
        const publicmapcontent = await redisClient.get('publicmapcontent');
        res.send(publicmapcontent);
    }
    catch (error) {
        console.error(error);
    }
};
//POST /Public Map Screen.
export const updatePublicMapContent = async (req, res) => {
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
//GET /Public Map GeoPos.
export const publicMapGeoPos = async (req, res) => {
    try {
        // Get current timestamp
        const now = Math.floor(Date.now() / 1000);
        console.log('now:', now);
        // Promisify Redis commands
        const zRangeAsync = promisify(redisClient.zRange).bind(redisClient);
        const hMGetAsync = promisify(redisClient.hmGet).bind(redisClient);
        console.log('About to fetch alert IDs');
        // Get all alert IDs
        const alertIds = await zRangeAsync('alerts:animals', 0, -1);
        console.log('alertIds:', alertIds);
        const alerts = [];
        // For each ID, get the coordinates and timestamp
        for (const id of alertIds) {
            console.log(`Fetching details for alert ID: ${id}`);
            const data = await hMGetAsync(`alerts:animals:${id}`, 'Latitude', 'Longitude', 'Timestamp');
            const [lat, lon, timestamp] = data;
            console.log(`Details for alert ID ${id}:`, data);
            // Check if the alert is from the last 48 hours
            if (now - timestamp <= 48 * 60 * 60) {
                alerts.push({
                    id,
                    position: [lat, lon]
                });
            }
        }
        console.log('alerts:', alerts);
        // Send the alerts as a response
        res.send(alerts);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching alert locations.');
    }
};
//# sourceMappingURL=homeScreenContent.js.map