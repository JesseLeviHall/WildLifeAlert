import { Request, Response } from "express";
import redis, { RedisClient } from "redis";

// Create a Redis client
const redisClient: RedisClient = redis.createClient();

//GET /Home Screen.
export const homeScreenContent = async (req: Request, res: Response): Promise<void> => {
    redisClient.get("homescreencontent", (error: Error | null, result: string | null) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error retrieving home screen content from Redis");
        }
        else if (!result) {
            // If the result is null or undefined, the key does not exist in Redis
            res.status(404).send("Home screen content not found in Redis");
        }
        else {
            // Parse the JSON object from the string retrieved from Redis
            const homeScreenContent = JSON.parse(result);
            // Send the JSON object as the response
            res.send(homeScreenContent);
        }
    });
};
