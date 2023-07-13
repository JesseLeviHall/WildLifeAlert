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
    //for each alert id, get geoposition
    for (const id of alertIds) {
        const data = await redis.hGetAll(`alerts:animals:${id}`);
        const { Latitude: lat, Longitude: lon } = data;
        //add to alerts array
        alerts.push({
            id,
            position: [lat, lon],
        });
    }
    return alerts;
}
export async function getActiveAlertsInRadius(redis, hours, longitude, latitude, radius) {
    // Get alerts within the rescuer's radius
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
            console.log(`AlertId: ${alertId}, AlertTimestamp: ${alertTimestamp}, PastTime: ${pastTime}`);
            if (alertTimestamp && Number(alertTimestamp) >= pastTime) {
                recentAlertsInArea.push(alertId);
            }
        }
    }
    return recentAlertsInArea;
}
//# sourceMappingURL=redisHelpers.js.map