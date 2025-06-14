import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    }
    catch (error) {
        console.log("Error in protectRoute:", error.message);
    }
};
export default protectRoute;
//# sourceMappingURL=protectRoute.js.map