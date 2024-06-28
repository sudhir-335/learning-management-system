import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytics.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get('/user-analytics', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getUserAnalytics);
analyticsRouter.get('/course-analytics', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getCourseAnalytics);
analyticsRouter.get('/order-analytics', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getOrderAnalytics);
export default analyticsRouter;