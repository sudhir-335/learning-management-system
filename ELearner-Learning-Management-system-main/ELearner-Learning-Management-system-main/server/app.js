// app.js
import express from 'express';

import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import ErrorHandler from './utils/ErrorHandler.js';
import ErrorMiddleware from "./middleware/error.js";
//body parser
app.use(express.json({ limit: '50mb' }));
// cookie parser
app.use(cookieParser());
// CORS
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import orderRouter from './routes/order.route.js';
import notificationRouter from './routes/notification.route.js';
import analyticsRouter from './routes/analytics.route.js';
import layoutRouter from './routes/layout.route.js';


// routes
app.use("/api/v1/", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter);




app.get('/', (req, res) => {
  res.send("Hello World");
})





// unknown routes
app.all("*", (req, res, next) => {
  const err = new ErrorHandler(`Route ${req.originalUrl} not found`, 404)
  // err.status = 404
  next(err)

})


app.use(ErrorMiddleware);
export { app };