// utils/redisHelpers.ts
import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
dotenv.config();
export async function getActiveAlerts(redis, hours) {
    //timestamp of current moment
    const now = Math.floor(Date.now() / 1000);
    //timestamp of 'hours' ago
    const pastTime = now - hours * 60 * 60;
    //get array of alert ids from the last 'hours' hours
    const alertIds = await redis.zRangeByScore("alerts:animals:timestamps", pastTime.toString(), "+inf");
    // Reverse the array to get the most recent alerts first
    alertIds.reverse();
    const alerts = [];
    //get alert data for each id
    for (const id of alertIds) {
        const data = await redis.hGetAll(id);
        alerts.push({
            id,
            ...data,
        });
    }
    return alerts;
}
//===================================================
//get active alerts in rescuer's radius
export async function getActiveAlertsInRadius(redis, hours, longitude, latitude, radius) {
    const alertsInArea = await redis.sendCommand([
        "GEORADIUS",
        "alerts:geospatial",
        longitude.toString(),
        latitude.toString(),
        radius.toString(),
        "km",
    ]);
    //timestamp of current moment
    const now = Math.floor(Date.now() / 1000);
    //timestamp of 'hours' ago
    const pastTime = now - hours * 60 * 60;
    // Filter alerts within the last 'hours' hours
    const recentAlertsInArea = [];
    if (Array.isArray(alertsInArea)) {
        for (const alertId of alertsInArea) {
            const alertTimestamp = await redis.zScore("alerts:animals:timestamps", String(alertId));
            if (alertTimestamp && Number(alertTimestamp) >= pastTime) {
                recentAlertsInArea.push(alertId);
            }
        }
    }
    return recentAlertsInArea;
}
//===================================================
export async function getAllRescuers() {
    try {
        // Fetch all the rescuer IDs from the set
        const rescuerIds = await redisClient.sMembers("rescuer:UserIds");
        console.log("getting rescuers:", rescuerIds);
        const rescuerData = [];
        for (const UserId of rescuerIds) {
            const data = await redisClient.hGetAll(`rescuer:${UserId}`);
            if (data && data.UserId) {
                rescuerData.push({
                    UserId: data.UserId,
                    FullName: data.FullName,
                    Phone: data.Phone,
                    Medical: data.Medical === "true",
                    Rehab: data.Rehab === "true",
                    Professional: data.Professional === "true",
                    Organization: data.Organization,
                    Status: data.Status,
                    Responses: parseInt(data.Responses, 10),
                    Latitude: parseFloat(data.Latitude),
                    Longitude: parseFloat(data.Longitude),
                    Notifications: data.Notifications === "true",
                    Radius: parseFloat(data.Radius),
                    expoPushToken: data.expoPushToken,
                    CreationDate: parseInt(data.CreationDate, 10),
                });
            }
        }
        return rescuerData;
    }
    catch (error) {
        console.error("Error fetching all rescuers:", error);
        return [];
    }
}
//# sourceMappingURL=redisHelpers.js.map