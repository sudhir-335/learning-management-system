import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";

// create course
export const createCourse = CatchAsyncError(async (data, res) => {
  const course = await courseModel.create(data);
  res.status(201).json({
    success: true,
    course
  })
})


// get all courses
export const getAllCoursesService = async (res) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    courses
  })
}