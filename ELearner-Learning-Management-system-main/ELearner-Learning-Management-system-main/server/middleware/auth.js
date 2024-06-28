import { CatchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import util from 'util';
import dotenv from 'dotenv'
import redis from "../utils/redis.js";
import jwt from "jsonwebtoken"

dotenv.config();



// authenticated user
export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = await util.promisify(jwt.verify)(access_token, process.env.ACCESS_TOKEN);
  // console.log(decoded);

  if (!decoded) {
    return next(new ErrorHandler("Invalid access token", 401));
  }

  const user = await redis.get(decoded.id,);

  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("User not found! May be logging in again help", 400));
  }

  req.user = JSON.parse(user);
  next();
})


// validate user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role || "")) {
      return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resource`, 403));
    }
    next();
  }
}
