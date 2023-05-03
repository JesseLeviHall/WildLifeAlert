import express, { Request, Response } from "express";
import  bodyParser from 'body-parser'
import logger from "morgan";
import helmet from "helmet";

// Routes
import { api } from "./routes/api.js";

// Create Express server
export const app = express();
app.use(bodyParser.json());

// Express configuration
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(logger("combined"));
app.use('/api', api);



export default app;