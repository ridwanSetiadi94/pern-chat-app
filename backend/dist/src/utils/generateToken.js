import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true, // Only accessible by the web server to prevent XSS attacks
        sameSite: "strict", // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    });
    return token;
};
export default generateToken;
//# sourceMappingURL=generateToken.js.map