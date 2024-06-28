import userModel from "../models/user.model.js"
import redis from "../utils/redis.js"


// get user by id
export const getUserByID = async (id, res) => {
  const userJson = await redis.get(id);
  if (!userJson) {
    return next(new ErrorHandler("User not login!", 400));
  }
  const user = JSON.parse(userJson);
  res.status(200).json({
    status: "success",
    user
  })
}


// get all users
export const getAllUserService = async (res) => {
  const users = await userModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    users
  })
}


// update user role by admin
export const updateUserRoleService = async (id, role, res) => {
  const user = await userModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found!", 400));
  }
  user.role = role;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "User role updated successfully"
  })
};