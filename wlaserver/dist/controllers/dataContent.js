import { redisClient } from "../services/db.setup.js";
import { getActiveAlertsInRadius } from "../utils/redisHelpers.js";
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
        const rescuer = await redisClient.hGetAll(`rescuer:${id}`);
        const radius = Number(rescuer.Radius);
        const longitude = Number(rescuer.Longitude);
        const latitude = Number(rescuer.Latitude);
        if (isNaN(radius) || isNaN(longitude) || isNaN(latitude)) {
            const alertCount = 0;
            res.status(200).json({ alertCount, message: "radius not set" });
            return;
        }
        const alerts = await getActiveAlertsInRadius(redisClient, 48, longitude, latitude, radius);
        const alertCount = alerts.length;
        //LATER CHANGE TO RETURN ALERTS FOR DETAILS SCREEN
        res.status(200).json({ alertCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//get total alerts
export const getTotalAlerts = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const id = await redisClient.get(UserId);
        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const alertCount = await redisClient.zCard("alerts:animals:timestamps");
        res.status(200).json({ alertCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=dataContent.js.map