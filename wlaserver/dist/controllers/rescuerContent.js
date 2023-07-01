import { redisClient } from "../services/db.setup.js";
import * as dotenv from "dotenv";
dotenv.config();
secretKey: process.env.CLERK_SECRET_KEY;
//GET /Rescuer Preferences
export const rescuerPrefsContent = async (req, res) => {
    try {
        /*  const rescuerprefscontent = await redisClient.get('rescuerprefscontent');
            res.send(rescuerprefscontent); */
        res.json({ Title: "Rescuer Preferences Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//PUT /Update Rescuer Preferences
export const updateRescuerPrefs = async (req, res) => {
    try {
        /*  const updaterescuerprefs = await redisClient.get('updaterescuerprefs');
            res.send(updaterescuerprefs); */
        res.json({ Title: "Update Rescuer Preferences Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//POST /Register new Rescuer
export const registerRescuer = async (req, res) => {
    try {
        const { FullName, Phone, Medical, Rehab, Organization, Latitude, Longitude, } = req.body;
        // Check if required fields are undefined
        if (!FullName || !Phone || !Medical || !Rehab || !Latitude || !Longitude) {
            res.status(400).json({ msg: "Invalid request: Missing required fields" });
        }
        /*  const session = await clerk.sessions.getSession(
          req.headers.authorization.split(" ")[1]
        );
        const UserId = session.userId; */
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
    }
    catch (error) {
        console.error(error);
    }
};
//GET /Rescuer Profile
export const rescuerProfile = async (req, res) => {
    try {
        const UserId = req.auth.userId;
        const id = await redisClient.get(UserId);
        if (!id) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        const rescuerprofile = await redisClient.hGetAll(`rescuer:${id}`);
        res.send(rescuerprofile);
    }
    catch (error) {
        console.error(error);
    }
};
//GET /Welcome Rescuer Content
export const welcomeRescuerContent = async (req, res) => {
    try {
        /*  const welcomerescuercontent = await redisClient.get('welcomerescuercontent');
            res.send(welcomerescuercontent); */
        res.json({ Title: "Welcome Rescuer Content Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//# sourceMappingURL=rescuerContent.js.map