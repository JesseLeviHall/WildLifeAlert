import { redisClient } from '../services/db.setup.js';
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
//# sourceMappingURL=homeScreenContent.js.map