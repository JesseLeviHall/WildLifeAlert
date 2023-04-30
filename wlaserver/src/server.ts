import { app } from "./app.js";
import http from "http";
import os from 'os';
import { connectToRedis } from './services/db.setup.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer():Promise<void> {
    try {
        await connectToRedis();
        const interfaces = os.networkInterfaces();
		let address: string;
		Object.keys(interfaces).forEach((interfaceName) => {
			const addresses = interfaces[interfaceName];
			for (let i = 0; i < addresses.length; i++) {
				const addr = addresses[i];
				if (addr.family === 'IPv4' && addr.internal === false) {
					address = addr.address;
					break;
				}
			}
		});
		server.listen(PORT, () => {
			console.log(`Server is running on IP ${address} and port ${PORT}`);
		});
    } catch (error) {
		console.error(error);
	}
}

startServer();

