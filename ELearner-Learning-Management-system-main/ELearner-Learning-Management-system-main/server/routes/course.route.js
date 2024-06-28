import express from "express"
import { addQuestion, addReply, addReview, addReviewReply, deleteCourse, editCourse, generateVideoUrl, getAllCourse, getAllCoursesForAdmin, getCourseContent, getSingleCourse, uploadCourse } from "../controllers/course.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js"
const courseRouter = express.Router();


courseRouter.post('/upload-course', updateAccessToken, isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.put('/edit-course/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.get('/get-course/:id', getSingleCourse);
courseRouter.get('/get-course', getAllCourse);
courseRouter.get('/get-course-content/:id', updateAccessToken, isAuthenticated, getCourseContent);
courseRouter.put('/add-question', updateAccessToken, isAuthenticated, addQuestion);
courseRouter.put('/add-answer', updateAccessToken, isAuthenticated, addReply);
courseRouter.put('/add-review/:id', updateAccessToken, isAuthenticated, addReview);
courseRouter.put('/add-review-reply', updateAccessToken, isAuthenticated, authorizeRoles("admin"), addReviewReply);
courseRouter.get('/all-course', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllCoursesForAdmin);
courseRouter.delete('/delete-course/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteCourse);
courseRouter.post('/getVdoCipherOTP', generateVideoUrl)
export default courseRouter;