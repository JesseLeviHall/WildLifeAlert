import * as dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config();
const dbpass = process.env.REDIS_PASS;
export const redisClient = createClient({
    password: `${dbpass}`,
    socket: {
        host: 'redis-19415.c289.us-west-1-2.ec2.cloud.redislabs.com',
        port: 19415,
    },
});
redisClient.on("error", function (error) {
    console.error("Redis error: ", error);
});
export const connectToRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    }
    catch (err) {
        console.error('Redis error: ', err);
    }
};
//# sourceMappingURL=db.setup.js.map