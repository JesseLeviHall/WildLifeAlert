import { app } from "./app.js";
import http from "http";
import { connectToRedis } from './services/db.setup.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer():Promise<void> {
    try {
        await connectToRedis();
        server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
		console.error(error);
	}
}

startServer();

