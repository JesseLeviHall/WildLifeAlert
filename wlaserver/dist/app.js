import express from "express";
import logger from "morgan";
import helmet from "helmet";
import { redisClient } from "./services/db.setup.js";
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
app.get('/databasetest', async (req, res) => {
    try {
        const TEST_KEY = 'test_node';
        // RedisJSON uses JSON Path syntax. '.' is the root.
        await redisClient.json.set(TEST_KEY, '.', { node: 4303 });
        const value = await redisClient.json.get(TEST_KEY, {
            // JSON Path: .node = the element called 'node' at root level.
            path: '.node',
        });
        res.send(`value of node: ${value}`);
    }
    catch (e) {
        console.error(e);
    }
});
export default app;
//# sourceMappingURL=app.js.map