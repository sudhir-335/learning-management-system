import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import userModel from "../models/user.model.js";
import courseModel from "../models/course.model.js";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";
import orderModel from "../models/order.model.js";


// Get user analytics
export const getUserAnalytics = CatchAsyncError(async (req, res, next) => {
  const userAnalyticsData = await generateLast12MonthsData(userModel);
  res.status(200).json({
    success: true,
    userAnalyticsData
  })
})


// get courses Analytics
export const getCourseAnalytics = CatchAsyncError(async (req, res, next) => {
  const courseAnalyticsData = await generateLast12MonthsData(courseModel);
  res.status(200).json({
    success: true,
    courseAnalyticsData
  })
})

// get orders analytics
export const getOrderAnalytics = CatchAsyncError(async (req, res, next) => {
  const orderAnalyticsData = await generateLast12MonthsData(orderModel);
  res.status(200).json({
    success: true,
    orderAnalyticsData
  })
})
