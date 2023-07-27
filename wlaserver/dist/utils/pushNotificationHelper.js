import { Expo } from "expo-server-sdk";
import { getAllRescuers } from "./redisHelpers.js";
let expo = new Expo();
// Logic to get the list of rescuer Expo push tokens
// 1 - Fetch all the rescuers
// 2 - For each rescuer, get the distance between the rescuer location and the alert location
// 3 - If the distance is less than the radius that the rescuer has set and the resucer's notifications attribute is "true", add the rescuer's Expo push token to the list, otherwise skip the rescuer.
//4 - return the list of Expo push tokens as rescuerTokens
// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
export async function sendPushNotificationsForAlert(alertId, Latitude, Longitude) {
    try {
        // Fetch all the rescuers
        const rescuers = await getAllRescuers();
        // Filter the rescuers based on distance and preferences
        const rescuerTokens = rescuers
            .filter((rescuer) => {
            const distance = calculateDistance(Latitude, Longitude, rescuer.Latitude, rescuer.Longitude);
            return distance <= rescuer.Radius && rescuer.Notifications;
        })
            .map((rescuer) => rescuer.expoPushToken);
        console.log("will be sending notifications to:", rescuerTokens);
        // Prepare notifications
        let messages = [];
        for (let token of rescuerTokens) {
            if (!Expo.isExpoPushToken(token)) {
                console.error(`Push token ${token} is not a valid Expo push token`);
                continue;
            }
            messages.push({
                to: token,
                sound: "default",
                body: "New wildlife alert nearby!",
                data: { alertId: alertId },
            });
        }
        // Send notifications in chunks
        let chunks = expo.chunkPushNotifications(messages);
        for (let chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk);
        }
    }
    catch (error) {
        console.error("Error sending push notifications:", error);
    }
}
//# sourceMappingURL=pushNotificationHelper.js.map