import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
import clerk from "@clerk/clerk-sdk-node";
dotenv.config();
//POST /Register new Rescuer
export const registerRescuer = async (req, res) => {
    try {
        const { userId, FullName, Phone, Medical, Rehab, Organization, Professional, Latitude, Longitude, expoPushToken } = req.body;
        // Check if required fields are undefined
        if (!FullName || !Phone) {
            res.status(400).json({ msg: "Invalid request: Missing required fields" });
            return;
        }
        const UserId = userId;
        //Check if the user already exists
        const UserExists = await redisClient.sendCommand(["SISMEMBER", "rescuer:UserIds", UserId]);
        if (UserExists) {
            res.status(400).json({ msg: "User already exists" });
            return;
        }
        const createdAt = Math.floor(Date.now() / 1000);
        const NotificationsValue = expoPushToken === "" ? "false" : "true";
        await redisClient.sendCommand([
            "HMSET",
            `rescuer:${UserId}`,
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
            "expoPushToken",
            expoPushToken,
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
            NotificationsValue,
            "CreationDate",
            createdAt.toString(),
        ]);
        //Add the UserId to the rescuer:UserIds set
        await redisClient.sendCommand(["SADD", "rescuer:UserIds", UserId]);
        res.send("New Rescuer Created");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//GET /Welcome Rescuer Content
export const welcomeRescuerContent = async (req, res) => {
    try {
        const welcomescreencontent = await redisClient.get("welcomecontent");
        res.send(welcomescreencontent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//PUT /Update Welcome Rescuer Content
export const updateWelcomeRescuerContent = async (req, res) => {
    try {
        const { Title, ThankYouMessage, DefaultSettingsInfo, MapInstructions, KindnessMessage, ResponsibilityMessage, ClosingMessage, } = req.body;
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
//GET /Rescuer Profile
export const rescuerProfile = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        const rescuerprofile = await redisClient.hGetAll(`rescuer:${UserId}`);
        res.send(rescuerprofile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//POST /Update Rescuer Pref: Geo Radius
export const updateRescuerPrefRadius = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        const { Radius } = req.body;
        await redisClient.sendCommand(["HSET", `rescuer:${UserId}`, "Radius", Radius.toString()]);
        res.send("Geo Radius Updated");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//POST /Update Rescuer Pref: Notifications
export const updateRescuerPrefNotifications = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        const Notifications = req.body.Notifications.toString();
        const expoPushToken = req.body.expoPushToken || "";
        await redisClient.sendCommand([
            "HSET",
            `rescuer:${UserId}`,
            "Notifications",
            Notifications,
            "expoPushToken",
            expoPushToken,
        ]);
        res.send("Notifications Updated");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//POST /Update Rescuer Push Token
export const updateRescuerPushToken = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        const newExpoPushToken = req.body.expoPushToken || "";
        // Fetch all fields of the user at once
        const userData = await redisClient.hGetAll(`rescuer:${UserId}`);
        // Check if the Notifications field is set to true
        if (userData.Notifications !== "true") {
            res.status(200).json({ msg: "User does not have notifications enabled." });
            return;
        }
        // Check if the current token is the same as the new token
        if (userData.expoPushToken !== newExpoPushToken) {
            // Update the token only if it's different
            await redisClient.sendCommand(["HSET", `rescuer:${UserId}`, "expoPushToken", newExpoPushToken]);
            res.send("Push Token Updated");
        }
        else {
            // If they are the same, just send a response without making any update
            res.send("Push Token remains unchanged");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//POST /Update Rescuer Pref: Location
export const updateRescuerPrefLocation = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
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
        if (Latitude < -90 || Latitude > 90 || Longitude < -180 || Longitude > 180) {
            res.status(400).json({ msg: "Latitude or Longitude out of range" });
            return;
        }
        await redisClient.sendCommand([
            "HSET",
            `rescuer:${UserId}`,
            "Latitude",
            Latitude.toString(),
            "Longitude",
            Longitude.toString(),
        ]);
        res.send("Location Updated");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//DELETE /Delete Rescuer
export const deleteRescuer = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const deletedUser = await clerk.users.deleteUser(UserId);
        if (!deletedUser) {
            res.status(500).json({ msg: "Failed to delete user in Clerk" });
            return;
        }
        const userExists = await redisClient.sIsMember("rescuer:UserIds", UserId);
        if (!userExists) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        await redisClient.sendCommand(["DEL", `rescuer:${UserId}`]);
        await redisClient.sendCommand(["DEL", UserId]);
        await redisClient.sendCommand(["SREM", "rescuer:UserIds", UserId]);
        res.send("Rescuer Deleted");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//DELETE /Delete clerk user on accidental user creation
export const deleteClerkUser = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const deletedUser = await clerk.users.deleteUser(UserId);
        if (!deletedUser) {
            res.status(500).json({ msg: "Failed to delete user in Clerk" });
            return;
        }
        res.status(200).json({ msg: "User deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
//# sourceMappingURL=rescuerContent.js.map