import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middlewares
import { checkOrigin } from "./middlewares/checkOrigin.js";

// Routes
import { api } from "./routes/api.js";
import { secureApi } from "./routes/secureApi.js";
import { dataApi } from "./routes/dataApi.js";

// Create Express server
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express configuration
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(
  logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
  )
);

app.use("/support", express.static(path.join(__dirname, "../public")));
app.get("/support", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/support.html"));
});
app.use("/", express.static(path.join(__dirname, "../public")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("Im alive!");
});
app.use(checkOrigin);
app.use("/api", api);
app.use("/secure-api", secureApi);
app.use("/data", dataApi);

export default app;
