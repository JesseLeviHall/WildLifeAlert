import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
import clerk from "@clerk/clerk-sdk-node";

dotenv.config();

//POST /Register new Rescuer
export const registerRescuer = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const {
      FullName,
      Phone,
      Medical,
      Rehab,
      Organization,
      Professional,
      Latitude,
      Longitude,
    } = req.body;
    // Check if required fields are undefined
    if (!FullName || !Phone) {
      res.status(400).json({ msg: "Invalid request: Missing required fields" });
      return;
    }

    const UserId = req.auth.userId;
    //Check if the user already exists
    const UserExists = await redisClient.sendCommand([
      "SISMEMBER",
      "rescuer:UserIds",
      UserId,
    ]);
    if (UserExists) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }
    const createdAt = Math.floor(Date.now() / 1000);
    const id = await redisClient.incr("rescuer:nextid");
    await redisClient.sendCommand([
      "HMSET",
      `rescuer:${id}`,
      "UserId",
      UserId,
      "FullName",
      FullName,
      "Phone",
      Phone,
      "Medical",
      Medical,
      "Rehab",
      Rehab,
      "Professional",
      Professional,
      "Organization",
      Organization,
      "Latitude",
      Latitude.toString(),
      "Longitude",
      Longitude.toString(),
      "Status",
      "Active",
      "Radius",
      "100",
      "Responses",
      "0",
      "Notifications",
      "true",
      "CreationDate",
      createdAt.toString(),
    ]);
    //Add the UserId to the rescuer:UserIds set
    await redisClient.sendCommand([
      "SADD",
      "rescuer:UserIds",
      UserId,
      id.toString(),
    ]);
    //Store a mapping from UserId to id
    await redisClient.sendCommand(["SET", UserId, id.toString()]);
    res.send("New Rescuer Created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//GET /Welcome Rescuer Content
export const welcomeRescuerContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const welcomescreencontent = await redisClient.get("welcomecontent");
    res.send(welcomescreencontent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//PUT /Update Welcome Rescuer Content
export const updateWelcomeRescuerContent = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const {
      Title,
      ThankYouMessage,
      DefaultSettingsInfo,
      MapInstructions,
      KindnessMessage,
      ResponsibilityMessage,
      ClosingMessage,
    } = req.body;
    const welcomecontent = JSON.stringify({
      Title,
      ThankYouMessage,
      DefaultSettingsInfo,
      MapInstructions,
      KindnessMessage,
      ResponsibilityMessage,
      ClosingMessage,
    });
    await redisClient.set("welcomecontent", welcomecontent);
    res.send("welcome content updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//GET /Rescuer Profile
export const rescuerProfile = async (
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
    const rescuerprofile = await redisClient.hGetAll(`rescuer:${id}`);
    res.send(rescuerprofile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//POST /Update Rescuer Pref: Geo Radius
export const updateRescuerPrefRadius = async (
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
    const { Radius } = req.body;
    await redisClient.sendCommand([
      "HSET",
      `rescuer:${id}`,
      "Radius",
      Radius.toString(),
    ]);
    res.send("Geo Radius Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//POST /Update Rescuer Pref: Notifications
export const updateRescuerPrefNotifications = async (
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
    const Notifications = req.body.Notifications.toString();
    await redisClient.sendCommand([
      "HSET",
      `rescuer:${id}`,
      "Notifications",
      Notifications,
    ]);
    res.send("Notifications Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//POST /Update Rescuer Pref: Location
export const updateRescuerPrefLocation = async (
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
    const { Latitude, Longitude } = req.body;

    // Check if Latitude and Longitude exist
    if (!Latitude || !Longitude) {
      res.status(400).json({ msg: "Invalid input data" });
      return;
    }

    // Check if Latitude and Longitude are within the correct ranges
    if (
      Latitude < -90 ||
      Latitude > 90 ||
      Longitude < -180 ||
      Longitude > 180
    ) {
      res.status(400).json({ msg: "Latitude or Longitude out of range" });
      return;
    }

    await redisClient.sendCommand([
      "HSET",
      `rescuer:${id}`,
      "Latitude",
      Latitude.toString(),
      "Longitude",
      Longitude.toString(),
    ]);
    res.send("Location Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//DELETE /Delete Rescuer
export const deleteRescuer = async (
  req: Request & WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const UserId = req.auth.userId;
    const deletedUser = await clerk.users.deleteUser(UserId);
    if (!deletedUser) {
      res.status(500).json({ msg: "Failed to delete user in Clerk" });
      return;
    }
    const id = await redisClient.get(UserId);
    if (!id) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    await redisClient.sendCommand(["DEL", `rescuer:${id}`]);
    await redisClient.sendCommand(["DEL", UserId]);
    await redisClient.sendCommand([
      "SREM",
      "rescuer:UserIds",
      UserId,
      id.toString(),
    ]);
    res.send("Rescuer Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
