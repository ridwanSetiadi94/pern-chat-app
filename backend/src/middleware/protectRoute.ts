import jwt, { JwtPayload } from "jsonwebtoken";

import { RequestHandler, Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: "Not authorized, invalid token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullName: true, profilePic: true },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.user = user; // Attach user to request object

    next();
  } catch (error: any) {
    console.log("Error in protectRoute:", error.message);
  }
};

export default protectRoute;
