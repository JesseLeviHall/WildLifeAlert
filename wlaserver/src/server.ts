import { app } from "./app.js";
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

function startServer():void {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}


startServer();

