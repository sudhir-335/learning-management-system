import express from 'express';
import { getNotification, updateNotification } from '../controllers/notification.controller.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { updateAccessToken } from '../controllers/user.controller.js';

const notificationRouter = express.Router();


notificationRouter.get('/get-all-notifications', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getNotification);
notificationRouter.put('/update-notification-status/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), updateNotification);


export default notificationRouter;