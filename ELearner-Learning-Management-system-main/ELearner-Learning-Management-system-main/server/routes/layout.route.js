import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { createLayout, editLayout, getLayout } from '../controllers/layout.controller.js';
import { updateAccessToken } from '../controllers/user.controller.js';

const layoutRouter = express.Router();

layoutRouter.post('/create-layout', updateAccessToken, isAuthenticated, authorizeRoles("admin"), createLayout);
layoutRouter.put('/edit-layout', updateAccessToken, isAuthenticated, authorizeRoles("admin"), editLayout);
layoutRouter.get('/get-layout', getLayout);

export default layoutRouter;


