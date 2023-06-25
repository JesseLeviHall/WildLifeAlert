import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";
//middlewares
import { checkOrigin } from "./middlewares/checkOrigin.js";
import { clerkAuth, clerkRouteHandler } from "./middlewares/clerkAuth.js";
// Routes
import { api } from "./routes/api.js";
// Create Express server
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Express configuration
app.use(helmet({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));
app.use("/healthcheck", (req, res) => {
    res.status(200).send("Im alive!");
});
app.use(checkOrigin);
app.use("/api", api);
app.use(clerkAuth);
app.use(clerkRouteHandler);
//app.use('/secure-api', secureApi);
export default app;
//# sourceMappingURL=app.js.map