import notificationModel from "../models/notification.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import cron from "node-cron";


// get all notifications (only for admin)
export const getNotification = CatchAsyncError(async (req, res, next) => {
  const notifications = await notificationModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    notifications,
  });
})


// update notification status (only for admin)
export const updateNotification = CatchAsyncError(async (req, res, next) => {
  const notification = await notificationModel.findById(req.params.id);
  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }
  notification.status = "read";
  await notification.save();
  const sortedNotification = await notificationModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    sortedNotification,
  });
})



// delete notification (only for admin)
cron.schedule("0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({ status: "read", createdAt: { $lt: thirtyDaysAgo } });
  console.log("30 or more days old read notifications deleted");
})