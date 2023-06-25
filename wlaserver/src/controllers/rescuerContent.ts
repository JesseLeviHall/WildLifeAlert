import { Request, Response } from "express";
import { redisClient } from "../services/db.setup.js";

//GET /Rescuer Preferences
export const rescuerPrefsContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    /*  const rescuerprefscontent = await redisClient.get('rescuerprefscontent');
        res.send(rescuerprefscontent); */
    res.json({ Title: "Rescuer Preferences Functional" });
  } catch (error) {
    console.error(error);
  }
};
