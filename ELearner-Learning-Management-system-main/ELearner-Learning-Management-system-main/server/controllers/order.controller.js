import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import orderModel from "../models/order.model.js";
import courseModel from "../models/course.model.js";
import userModel from "../models/user.model.js";
import notificationModel from "../models/notification.model.js";
import ejs from "ejs";
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import sendMail from "../utils/sendMail.js";
import { getAllOrderService, newOrder } from "../services/order.services.js";
import { get } from "http";



// create Order 
export const createOrder = CatchAsyncError(async (req, res, next) => {
  const { courseId, payment_info } = req.body;
  const user = await userModel.findById(req.user._id);
  const courseExistsInUser = user.courses.some(course => {
    return course.courseId === courseId
  });
  if (courseExistsInUser) {
    return next(new ErrorHandler("You have already purchased this course", 400))
  }
  const course = await courseModel.findById(courseId);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404))
  }

  const data = {
    courseId,
    userId: user._id,
    payment_info
  }


  // send mail to user
  const mailData = {
    order: {
      id: courseId.slice(0, 6),
      name: course.name,
      price: course.price,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
  try {
    await sendMail({
      email: user.email,
      subject: "Course Purchase",
      template: "orderConformation.ejs",
      data: mailData
    })
  } catch (error) {
    next(new ErrorHandler("Email could not be sent", 500));
  }

  user.courses.push({
    courseId
  });
  course.purchased += 1;
  course.save();

  await user.save();

  const notification = {
    userId: user._id,
    title: "Course Purchase",
    message: `You have a new Order for the course ${course.name}`,
  }

  await notificationModel.create(notification);

  newOrder(data, res);


});


// get all orders (only for admin)
export const getAllOrder = CatchAsyncError(async (req, res) => {
  getAllOrderService(res);
})