import express from "express";
import logger from "morgan";
import helmet from "helmet";
// Routes
import { api } from "./routes/api.js";
// Create Express server
export const app = express();
// Express configuration
app.use(helmet({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use(logger("combined"));
app.use('/api', api);
export default app;
//# sourceMappingURL=app.js.map