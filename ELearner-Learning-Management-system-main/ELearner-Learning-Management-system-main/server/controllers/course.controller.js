import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import cloudinary from "cloudinary"
import { createCourse, getAllCoursesService } from "../services/course.services.js";
import courseModel from "../models/course.model.js";
import redis from "../utils/redis.js";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import sendMail from "../utils/sendMail.js";
import notificationModel from "../models/notification.model.js";
import axios from "axios";


// upload course
export const uploadCourse = CatchAsyncError(async (req, res, next) => {
  console.log("Hello")
  const data = req.body;
  const thumbnail = data.thumbNail
  if (thumbnail) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.thumbNail, {
      folder: "course"
    })

    data.thumbNail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  }
  createCourse(data, res);
})


// edit course
export const editCourse = CatchAsyncError(async (req, res, next) => {
  const data = req.body;
  const thumbnail = data.thumbNail
  if (thumbnail) {
    await cloudinary.v2.uploader.destroy(thumbnail.public_id)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.thumbNail, {
      folder: "course"
    })

    data.thumbNail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  }
  const course = await courseModel.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!course) {
    return next(new ErrorHandler("Course not found", 404))
  }
  res.status(200).json({
    success: true,
    course
  })
})


// get single course ---- without purchase
export const getSingleCourse = CatchAsyncError(async (req, res, next) => {
  const courseId = req.params.id;

  // is course cached in redis
  const isCourseCached = await redis.get(courseId);

  if (!isCourseCached) {
    // console.log("hitting mongodb");
    const course = await courseModel.findById(courseId).select("-courseData.videoUrl -courseData.questions -courseData.suggestions -courseData.links");
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    redis.set(courseId, JSON.stringify(course), "EX", 259200);
    res.status(200).json({
      success: true,
      course
    })
  }
  else {
    const course = JSON.parse(isCourseCached);
    res.status(200).json({
      success: true,
      course
    })
  }

})



// get all courser ---- without purchase
export const getAllCourse = CatchAsyncError(async (req, res, next) => {

  // is All course cached in redis

  const courses = await courseModel.find().select("-courseData.videoUrl -courseData.questions -courseData.suggestions -courseData.links");
  res.status(200).json({
    success: true,
    courses
  })
})



// get course content for purchased course
export const getCourseContent = CatchAsyncError(async (req, res, next) => {
  const courseId = req.params.id;


  const userCourseList = req.user?.courses;

  const isCourseExist = userCourseList.find(userCourseID => {
    return userCourseID.courseId === courseId
  });

  if (!isCourseExist) {
    return next(new ErrorHandler("You are not Enrolled in this Course", 404));
  }

  const course = await courseModel.findById(courseId);
  const courseContent = course.courseData;

  res.status(200).json({
    success: true,
    courseContent
  })
})



// add question on course
export const addQuestion = CatchAsyncError(async (req, res, next) => {
  const { question, courseId, contentId } = req.body;
  const course = await courseModel.findById(courseId);
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return next(new ErrorHandler("Invalid Content ID", 400));
  }
  else {
    const content = course.courseData.find(content => content._id == contentId);

    if (!content) {
      return next(new ErrorHandler("Content not found", 404));
    }
    const newQuestion = {
      user: req.user,
      question,
      questionReplies: []
    }
    content.questions.push(newQuestion);
    await notificationModel.create({
      userId: req.user._id,
      title: "New Question Received",
      message: `${req.user.name} has asked a new question in the course ${course.name} on the content ${content.title}`
    })
    await course.save();
    res.status(200).json({
      success: true,
      course
    })
  }
});


// add reply on question
export const addReply = CatchAsyncError(async (req, res, next) => {
  const { reply, courseId, contentId, questionId } = req.body;
  const course = await courseModel.findById(courseId);
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return next(new ErrorHandler("Invalid Content ID", 400));
  }
  else {
    const content = course.courseData.find(content => content._id == contentId);

    if (!content) {
      return next(new ErrorHandler("Content not found", 404));
    }

    const question = content.questions.find(question => question._id == questionId);

    if (!question) {
      return next(new ErrorHandler("Question not found", 404));
    }

    const newReply = {
      user: req.user,
      reply
    }
    question.questionReplies.push(newReply);
    await course.save();


    if (req.user._id.toString() === question.user._id.toString()) {
      // send notification to user
      await notificationModel.create({
        userId: req.user._id,
        title: "Question Reply Received",
        message: `Your question has been replied by ${req.user.name} in the course ${course.name} on the content ${content.title}`
      })
    } else {
      const data = {
        name: question.user.name,
        title: content.title,
      }

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          template: "questionReply.ejs",
          data
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }

      res.status(201).json({
        success: true,
        course
      })



    }
  }
});


// add review on course
export const addReview = CatchAsyncError(async (req, res, next) => {

  const userCourseList = req.user?.courses;
  const courseId = req.params.id;


  const isCourseExist = userCourseList.find(userCourseID => { return userCourseID.courseId === courseId });
  console.log(isCourseExist);
  if (!isCourseExist) {
    return next(new ErrorHandler("You are not Enrolled in this Course", 404));
  }

  const { review, rating } = req.body;
  const course = await courseModel.findById(courseId);

  const reviewData = {
    user: req.user,
    review,
    rating
  }

  course.reviews.push(reviewData);

  let avg = 0;
  course.reviews.forEach(review => {
    avg += review.rating;
  });
  course.rating = avg / course.reviews.length;
  await course.save();

  const notification = {
    title: "New Review",
    message: `${req.user.name} has given a new review in the course ${course.name}`
  }
  // create a notification

  res.status(200).json({
    success: true,
    course
  })

})



// add reply to the reviews
export const addReviewReply = CatchAsyncError(async (req, res, next) => {
  const { reply, courseId, reviewId } = req.body;

  const course = await courseModel.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }


  const review = course.reviews.find(review => review._id.toString() == reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const newReply = {
    user: req.user,
    reply
  }
  review.reviewReplies.push(newReply);
  await course.save();

  res.status(201).json({
    success: true,
    course
  })
})



// get all courses for admin
export const getAllCoursesForAdmin = CatchAsyncError(async (req, res, next) => {
  getAllCoursesService(res);
})


// delete course (only for admin)
export const deleteCourse = CatchAsyncError(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await courseModel.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("course not found", 400));
  }
  await course.deleteOne({ _id: courseId });
  await redis.del(courseId);
  res.status(200).json({
    success: true,
    message: "course deleted successfully"
  })
});



// generate video url
export const generateVideoUrl = CatchAsyncError(async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`,
        }
      }
    )
    res.json(response.data);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})