import express, { Request, Response } from "express";
import  bodyParser from 'body-parser'
import logger from "morgan";
import helmet from "helmet";



//middlewares
import { checkOrigin } from "./middlewares/checkOrigin.js"


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
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));
app.use(checkOrigin);
app.use('/api', api);



export default app;