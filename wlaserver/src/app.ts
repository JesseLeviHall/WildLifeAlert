import express from "express";
import logger from "morgan";
import * as path from "path";
import helmet from "helmet";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { homeRouter } from "./routes/homeRoute";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", homeRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);
