import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import orderModel from "../models/order.model.js";

export const newOrder = CatchAsyncError(async (data, res) => {
  const order = await orderModel.create(data);
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order
  })
})


// get all orders (only for admin)
export const getAllOrderService = async (res) => {
  const orders = await orderModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    orders
  })
}