import clerk, { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "production") {
    const secretClerk = process.env.CLERK_SECRET_KEY;
}
else {
    const secretClerk = process.env.CLERK_SECRET_DEV_KEY;
}
export const clerkAuth = ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY,
    sessionOptions: {
        onError(error, req, res) {
            console.error(error);
            res.status(500).json({ error: { message: "Internal Server Error", status: 500 } });
        },
    },
});
export const clerkRouteHandler = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const [, sessionId, sessionToken] = req.headers.authorization.split(" ");
            const session = await clerk.sessions.verifySession(sessionId, sessionToken);
            const sessionHeader = req.headers.authorization.split(" ")[1];
            const authReq = req;
            authReq.auth.sessionId = sessionHeader;
            authReq.auth.userId = session.userId;
            if (!session) {
                return res.status(401).json({ error: { message: "No Session", status: 401 } });
            }
        }
        catch (error) {
            console.error("Error:", error.errors[0].longMessage);
            return res.status(401).json({
                error: { message: error.errors[0].longMessage, status: 401 },
            });
        }
    }
    else {
        return res.status(401).json({ error: { message: "No Authorization Provided", status: 401 } });
    }
    next();
};
//# sourceMappingURL=clerkAuth.js.map