import express from "express";
import logger from "morgan";
import * as path from "path";
import helmet from "helmet";
import { createClient } from 'redis';

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { api } from "./routes/api";

// Create Express server
export const app = express();

// Redis
const client = createClient({
    password: 'RaW2XeXJ2nQQCi7VXBtSFxBCDcRBKPEI',
    socket: {
        host: 'redis-19415.c289.us-west-1-2.ec2.cloud.redislabs.com',
        port: 19415
    }
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(logger("combined"));

app.use(express.static(path.join(__dirname, "../public")));
app.use('/api', api);

app.use(errorNotFoundHandler);
app.use(errorHandler);
