import { Request, Response } from "express";
import { redisClient } from "../services/db.setup.js";
import { getActiveAlerts } from "../utils/redisHelpers.js";
import { sendPushNotificationsForAlert } from "../utils/pushNotificationHelper.js";

interface File extends Express.Multer.File {
  key?: string;
}

interface MulterRequest extends Request {
  files: File[];
}

//GET /Home Screen.
export const homeScreenContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const homescreencontent = await redisClient.get("homescreencontent");
    res.send(homescreencontent);
  } catch (error) {
    console.error(error);
  }
};

//POST /Home Screen.
export const updateHomeScreenContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Title, Description, Message } = req.body;
    const homescreencontent = JSON.stringify({ Title, Description, Message });
    await redisClient.set("homescreencontent", homescreencontent);
    res.send("Home Screen Content Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
/* 
SET homescreencontent '{"Title":"","Description":"","Message":""}'
*/

//GET /Public Map Screen.
export const publicMapContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const publicmapcontent = await redisClient.get("publicmapcontent");
    res.send(publicmapcontent);
  } catch (error) {
    console.error(error);
  }
};

//POST /Public Map Screen.
export const updatePublicMapContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Title, Description, Message } = req.body;
    const publicmapcontent = JSON.stringify({ Title, Description, Message });
    await redisClient.set("publicmapcontent", publicmapcontent);
    res.send("Public Map Content Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
/*
SET publicmapcontent '{"Title":"","Description":"","Message":""}'
*/

//GET /Public Map GeoPos.
export const publicMapGeoPos = async (req: Request, res: Response): Promise<void> => {
  try {
    const alerts = await getActiveAlerts(redisClient, 48);
    res.send(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching alert locations.");
  }
};

//POST New Alert
export const newAlert = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { FullName, Latitude, Longitude, Animal, Description, Email, ShareContact } = req.body;

    // Check if required fields are undefined
    if (!FullName || !Latitude || !Longitude || !Animal || !Description || !Email) {
      res.status(400).send("Invalid request: Missing required fields");
      return;
    }
    //map photos to array of urls
    const Photos = req.files ? req.files.map((file: File) => file.key) : [];
    // If Photo is undefined, use a default photo URL instead
    const photoUrlsString = JSON.stringify(Photos.length > 0 ? Photos : ["defaultphoto.png"]);
    const timestamp = Math.floor(Date.now() / 1000);
    const id = await redisClient.incr("alerts:animals:nextid");

    // Send the HMSET command
    await redisClient.sendCommand([
      "HMSET",
      `alerts:animals:${id}`,
      "FullName",
      FullName,
      "Latitude",
      Latitude.toString(),
      "Longitude",
      Longitude.toString(),
      "Photo",
      photoUrlsString,
      "Animal",
      Animal,
      "Description",
      Description,
      "Email",
      Email,
      "ShareContact",
      ShareContact.toString(),
      "Timestamp",
      timestamp.toString(),
    ]);

    // Send the ZADD command
    await redisClient.sendCommand([
      "ZADD",
      "alerts:animals:timestamps",
      timestamp.toString(),
      `alerts:animals:${id.toString()}`,
    ]);
    // Add the alert to the geospatial index
    await redisClient.sendCommand(["GEOADD", "alerts:geospatial", Longitude, Latitude, `alerts:animals:${id}`]);
    res.send("New Alert Created");
    const alertId = `alerts:animals:${id}`;
    console.log("about to send push notifications");
    sendPushNotificationsForAlert(alertId, Latitude, Longitude);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//POST /Resouce for resources Screen.
export const updateResourcesContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Icon, ResourceType, Title, Description, Image, Url, ButtonText } = req.body;
    //check if required fields are undefined
    if (!Icon || !ResourceType || !Title || !Description || !Image || !Url || !ButtonText) {
      res.status(400).send("Invalid request: Missing required fields");
      return;
    }
    const id = await redisClient.incr("resources:nextid");
    const resourceKey = `resources:${id}`;
    //send the HMSET command
    await redisClient.sendCommand([
      "HMSET",
      resourceKey,
      "Icon",
      Icon,
      "ResourceType",
      ResourceType,
      "Title",
      Title,
      "Description",
      Description,
      "Image",
      Image,
      "Url",
      Url,
      "ButtonText",
      ButtonText,
    ]);
    //send the ZADD command
    await redisClient.sendCommand(["ZADD", "resources:ids", id.toString(), id.toString()]);

    res.send("Resource Content Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//GET /Resouces Screen.
export const resourcesContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const resourceIds = await redisClient.zRange("resources:ids", 0, -1);

    let resources = [];
    for (let id of resourceIds) {
      let key = "resources:" + id;
      let resource = await redisClient.hGetAll(key);
      resources.push(resource);
    }
    res.send(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/* 
{
        "Icon": "web",
        "ResourceType": "Emergency Resource",
        "Title": "Animal Help Now",
        "Description": "Contact Your Local Rescue Organizations",
        "Image": "https://ahnow.org/images/weblink_large.png",
        "Url": "https://ahnow.org",
        "ButtonText": "Visit"
}

*/

//POST /About Screen content.
export const updateAboutContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Title, Description, Mission, Message, Action, Link, Merch } = req.body;
    //check if required fields are undefined
    if (!Title || !Description || !Message) {
      res.status(400).send("Invalid request: Missing required fields");
      return;
    }
    const aboutcontent = JSON.stringify({
      Title,
      Description,
      Mission,
      Message,
      Action,
      Link,
      Merch,
    });
    await redisClient.set("aboutcontent", aboutcontent);
    res.send("About Content Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/* 
{
	"Title": "About WildLifeAlert",
	"Description": "This is a passion project about helping animals in need.",
	"Mission": "",
	"Message": ""
}
*/

//GET /About Screen content.
export const aboutContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const aboutcontent = await redisClient.get("aboutcontent");
    res.send(aboutcontent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//Get /privacy policy content
export const privacyPolicyContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const privacyPolicyContent = await redisClient.get("privacyPolicyContent");
    res.send(privacyPolicyContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//POST /privacy policy content
export const updatePrivacyPolicyContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Title, Link, Title2, Link2 } = req.body;
    //check if required fields are undefined
    if (!Title || !Link || !Title2 || !Link2) {
      res.status(400).send("Invalid request: Missing required fields");
      return;
    }
    const privacyPolicyContent = JSON.stringify({ Title, Link, Title2, Link2 });
    await redisClient.set("privacyPolicyContent", privacyPolicyContent);
    res.send("Privacy Policy Content Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//post add email to block list
export const addBlockEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email } = req.body;

    // Check if required fields are undefined
    if (!Email) {
      res.status(400).send("Invalid request: Missing required fields");
      return;
    }

    // Convert email to lowercase
    const lowercaseEmail = Email.toLowerCase();

    await redisClient.sAdd("BlockEmails", lowercaseEmail);

    res.status(201).send("Email added to block list");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
