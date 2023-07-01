import clerk, {
  ClerkExpressWithAuth,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const clerkAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  sessionOptions: {
    onError(error: Error, req: Request, res: Response) {
      console.error(error);
      res
        .status(500)
        .json({ error: { message: "Internal Server Error", status: 500 } });
    },
  },
});

export const clerkRouteHandler = async (
  req: Request & WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const [, sessionId, sessionToken] = req.headers.authorization.split(" ");
      const session = await clerk.sessions.verifySession(
        sessionId,
        sessionToken
      );

      const sessionHeader = req.headers.authorization.split(" ")[1];
      const authReq = req as WithAuthProp<Request>;
      authReq.auth.sessionId = sessionHeader;
      authReq.auth.userId = session.userId;
      if (!session) {
        return res
          .status(401)
          .json({ error: { message: "No Session", status: 401 } });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        error: { message: "Session could not be verified", status: 401 },
      });
    }
  } else {
    return res
      .status(401)
      .json({ error: { message: "No Authorization Provided", status: 401 } });
  }

  next();
};
