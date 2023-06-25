import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as dotenv from "dotenv";
dotenv.config();
export const clerkAuth = ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY,
    onUserAuthenticated: (user) => {
        console.log("User authenticated: ", user);
    },
    onUserUnauthenticated: () => {
        console.log("User unauthenticated");
    },
});
export const clerkRouteHandler = (req, res, next) => {
    const authReq = req;
    if (!authReq.auth.sessionId) {
        return res.status(401).send("Unauthenticated");
    }
    next();
};
//# sourceMappingURL=clerkAuth.js.map