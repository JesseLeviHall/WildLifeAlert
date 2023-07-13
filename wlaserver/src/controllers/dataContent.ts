import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
import clerk from "@clerk/clerk-sdk-node";

dotenv.config();

export const getActiveAlertsInArea = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const UserId = req.auth.userId;
    const id = await redisClient.get(UserId);
    if (!id) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    //const alertCount = await redisClient. (get how many alerts are in the users pref area of their location and return it)
    //res.send(alertCount);
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
