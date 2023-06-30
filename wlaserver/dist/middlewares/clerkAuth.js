import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as dotenv from "dotenv";
dotenv.config();
export const clerkAuth = ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY,
    sessionOptions: {
        onError(error, req, res) {
            console.error(error);
            res
                .status(500)
                .json({ error: { message: "Internal Server Error", status: 500 } });
        },
    },
});
export const clerkRouteHandler = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization != undefined) {
        const sessionHeader = req.headers.authorization.split(" ")[1];
        const authReq = req;
        authReq.auth.sessionId = sessionHeader;
    }
    else {
        return res
            .status(401)
            .json({ error: { message: "Unauthenticated", status: 401 } });
    }
    next();
};
//# sourceMappingURL=clerkAuth.js.map