import { ClerkExpressWithAuth, WithAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const clerkAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  onUserAuthenticated: (user: any) => {
    console.log("User authenticated: ", user);
  },
  onUserUnauthenticated: () => {
    console.log("User unauthenticated");
  },
});

export const clerkRouteHandler = (
  req: Request & WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  const authReq = req;
  if (!authReq.auth.sessionId) {
    return res.status(401).send("Unauthenticated");
  }
  next();
};
