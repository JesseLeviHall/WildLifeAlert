import express from "express";
import logger from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
// Routes
import { api } from "./routes/api.js";
// Create Express server
export const app = express();
// Redis
const dbpass = process.env.REDIS_PASS;
export const redisClient = createClient({
    password: `${dbpass}`,
    socket: {
        host: 'redis-19415.c289.us-west-1-2.ec2.cloud.redislabs.com',
        port: 19415
    }
});
// Listen for the "ready" event
redisClient.on("ready", () => {
    console.log("Connected to Redis server");
});
// Listen for the "error" event
redisClient.on("error", (err) => {
    console.error("Redis error: ", err);
});
await redisClient.connect();
// Express configuration
app.use(helmet({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use(logger("combined"));
app.use('/api', api);
export default app;
//# sourceMappingURL=app.js.map