import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import util from 'util'
import dotenv from 'dotenv';
dotenv.config();
import ejs from "ejs"
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/jwt.js";
import redis from "../utils/redis.js";
import { getAllUserService, getUserByID, updateUserRoleService } from "../services/user.services.js";
import { accessTokenOptions, refreshTokenOptions } from "../utils/jwt.js";
import cloudinary from "cloudinary";
// register User


// Function to generate activation code
function generateActivationCode() {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000);
}


const signToken = user => {
  const activationCode = generateActivationCode();
  const token = jwt.sign({ user, activationCode }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES
  })
  return { token, activationCode };
}

// register user(only sending activation code)
export const userRegistration = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("Hello")
  const isEmailExist = await userModel.find({ email });
  // console.log(isEmailExist);
  if (isEmailExist.length !== 0) return next(new ErrorHandler("Email already exists", 400));

  const user = { name, email, password }
  const activationToken = signToken(user);
  const token = activationToken.token;
  const activationCode = activationToken.activationCode;

  const data = { user: { name: user.name }, activationCode }
  // const html = await ejs.renderFile(path.join(__dirname, "../mails/activationMail.ejs"), data);

  try {
    await sendMail({
      email: user.email,
      subject: "Activate Your Account",
      template: "activationMail.ejs",
      data
    })

    res.status(201).json({
      success: true,
      message: `Please check your email ${user.email} to activate your account`,
      token
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

})


// activate user(actually registering user)

export const activateUser = CatchAsyncError(async (req, res, next) => {
  const { activation_Token, activation_Code } = req.body;
  const decoded_payload = await util.promisify(jwt.verify)(activation_Token, process.env.SECRET_STR);
  if (decoded_payload.activationCode !== activation_Code) {
    return next(new ErrorHandler("Invalid activation Code", 400));
  }

  const { name, email, password } = decoded_payload.user;


  const user = await userModel.create({
    name, email, password
  });

  res.status(200).json({
    status: "success",
    data: {
      name, email
    }
  })

})




// login user

export const userLogin = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Provide both email and password for login", 400));
  }

  const user = await userModel.findOne({ email }).select('+password');

  // const isMatch = await user.comparePassword(password, user.password);
  // console.log(user);
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Incorrect email or password", 400))
  }
  // console.log(user);
  sendToken(user, 200, res);
})





// update access token
export const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = await util.promisify(jwt.verify)(refresh_token, process.env.REFRESH_TOKEN);
  // console.log(decoded);

  if (!decoded) {
    return next(new ErrorHandler("Invalid refresh token", 401));
  }
  // console.log(decoded);
  const user = JSON.parse(await redis.get(decoded.id));


  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("Please Login to access the resources!", 400));
  }

  const accessToken = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "5m" });
  const refreshToken = await jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: "3d" });

  req.user = user;
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  await redis.set(user._id, JSON.stringify(user), "EX", 259200);

  next();

})










// User logout
export const userLogout = CatchAsyncError(async (req, res, next) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  const userId = req.user._id || "";
  redis.del(userId)
  res.status(200).json({
    success: true,
    message: "Logged out"
  })
});




// get user info
export const getUserInfo = CatchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  getUserByID(userId, res);
})


// social auth
export const socialAuth = CatchAsyncError(async (req, res, next) => {
  const { email, name } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const newUser = await userModel.create({
      name, email
    });
    sendToken(newUser, 200, res);
  }
  else {
    sendToken(user, 200, res);
  }
})



// update user info
export const updateUserInfo = CatchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user._id;
  const user = await userModel.findById(userId);



  if (name && user) {
    user.name = name
  }

  // Update the info in the Mongo Database and on redis
  await user.save();
  await redis.set(userId, JSON.stringify(user));

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user
  });

})



// Update user password
export const updateUserPassword = CatchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please provide both old and new password", 400));
  }
  const userId = req.user._id;
  const user = await userModel.findById(userId).select("+password");
  if (user.password === undefined) {
    return next(new ErrorHandler("User not found", 400));
  }
  if (!(await user.comparePassword(oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  user.password = newPassword;

  // Update the info in the Mongo Database and on redis
  await user.save();
  await redis.set(userId, JSON.stringify(user));
  res.status(200).json({
    success: true,
    message: "Password updated successfully"
  });
})



// Update profile picture
export const updateProfilePicture = CatchAsyncError(async (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    return next(new ErrorHandler("Please provide an image", 400));
  }
  const userId = req.user._id;
  const user = await userModel.findById(userId);

  if (user && avatar) {
    if (user?.avatar?.public_id) {
      console.log(user.avatar.public_id);
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      console.log("hello1");

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        wid: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }
    else {
      console.log("hello2");
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        wid: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }

  }
  await user.save();
  await redis.set(user._id, JSON.stringify(user));
  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
    user
  });

})



// get all users (only for admin)
export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  getAllUserService(res);
})



// update user role (only for admin)
export const updateUserRole = CatchAsyncError(async (req, res, next) => {
  const { id, role } = req.body;
  updateUserRoleService(id, role, res);
})


// delete user (only for admin)
export const deleteUser = CatchAsyncError(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  await user.deleteOne({ _id: userId });
  await redis.del(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  })
});
