import express from "express";
import { login, logout, signup, getMe, } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/me", protectRoute, getMe);
router.post("/login", login);
router.post("/logout", logout);
// /api/auth/signup
router.post("/signup", signup);
export default router;
//# sourceMappingURL=auth.route.js.map