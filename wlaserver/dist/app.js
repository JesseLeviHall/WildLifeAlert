import express from "express";
import logger from "morgan";
import path from "path";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { createClient } from "redis";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler.js";
dotenv.config();
// Routes
import { api } from "./routes/api.js";
// Create Express server
export const app = express();
// Redis
const dbpass = process.env.REDIS_PASS;
const client = createClient({
    password: `${dbpass}`,
    socket: {
        host: 'redis-19415.c289.us-west-1-2.ec2.cloud.redislabs.com',
        port: 19415
    }
});
// Listen for the "ready" event
client.on("ready", () => {
    console.log("Connected to Redis server");
});
// Listen for the "error" event
client.on("error", (err) => {
    console.error("Redis error: ", err);
});
await client.connect();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(new URL("../views", import.meta.url).pathname));
app.set("view engine", "pug");
app.use(helmet({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use(logger("combined"));
app.use(express.static(path.join(new URL("../public", import.meta.url).pathname)));
app.use('/api', api);
app.use(errorNotFoundHandler);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map