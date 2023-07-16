// utils/redisHelpers.ts
import { redisClient } from "../services/db.setup.js";

import * as dotenv from "dotenv";

dotenv.config();

//change this function to set alerts to the entire alert object
export async function getActiveAlerts(redis: typeof redisClient, hours: number) {
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
export async function getActiveAlertsInRadius(
  redis: typeof redisClient,
  hours: number,
  longitude: number,
  latitude: number,
  radius: number
) {
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
