import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
dotenv.config();
//get active alerts in rescuer's radius
export const getActiveAlertsInArea = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const id = await redisClient.get(UserId);
        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        //const alertCount = await redisClient. (get how many alerts are in the users pref area of their location and return it)
        //res.send(alertCount);
        const alertCount = 3;
        res.status(200).json({ alertCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//get total active alerts
export const getTotalActiveAlerts = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const id = await redisClient.get(UserId);
        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        //const alertCount = await redisClient. (get how many alerts are in the users pref area of their location and return it)
        //res.send(alertCount);
        const alertCount = 3;
        res.status(200).json({ alertCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=dataContent.js.map