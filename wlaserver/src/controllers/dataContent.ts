import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { redisClient } from "../services/db.setup.js";
import { getActiveAlertsInRadius } from "../utils/redisHelpers.js";
import * as dotenv from "dotenv";
import clerk from "@clerk/clerk-sdk-node";

dotenv.config();

//get active alerts in rescuer's radius
export const getActiveAlertsInArea = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
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
      res.status(200).json({ alertCount });
      return;
    }

    const alerts = await getActiveAlertsInRadius(
      redisClient,
      48,
      longitude,
      latitude,
      radius
    );
    const alertCount = alerts.length;

    res.status(200).json({ alertCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get total alerts
export const getTotalAlerts = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const UserId = req.auth.userId;
    const id = await redisClient.get(UserId);
    if (!id) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const alertCount = await redisClient.zCard("alerts:animals:timestamps");
    res.status(200).json({ alertCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
