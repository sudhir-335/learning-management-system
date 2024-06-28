import express from "express"
import { activateUser, getUserInfo, socialAuth, updateUserInfo, userLogin, updateAccessToken, userLogout, userRegistration, updateUserPassword, updateProfilePicture, getAllUsers, updateUserRole, deleteUser } from "../controllers/user.controller.js"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
const userRouter = express.Router();


userRouter.post('/registration', userRegistration);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', userLogin);
userRouter.get('/logout', isAuthenticated, userLogout);
userRouter.get('/refresh', updateAccessToken);
userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-profile", updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", updateAccessToken, isAuthenticated, updateUserPassword);
userRouter.put("/update-user-avatar", updateAccessToken, isAuthenticated, updateProfilePicture);
userRouter.get("/all-users", updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllUsers);
userRouter.put("/update-user-role", updateAccessToken, isAuthenticated, authorizeRoles("admin"), updateUserRole);
userRouter.delete("/delete-user/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteUser);
export default userRouter