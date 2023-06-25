import { ClerkExpressWithAuth, WithAuthProp } from "@clerk/clerk-sdk-node";
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

export const clerkRouteHandler = (
  req: Request & WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  const sessionHeader = req.headers.authorization.split(" ")[1];
  const authReq = req as WithAuthProp<Request>;
  authReq.auth.sessionId = sessionHeader;

  if (!authReq.auth.sessionId) {
    return res
      .status(401)
      .json({ error: { message: "Unauthenticated", status: 401 } });
  }
  next();
};
