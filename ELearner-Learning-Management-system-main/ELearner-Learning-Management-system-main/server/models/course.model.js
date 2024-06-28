import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0
  },
  review: String,
  reviewReplies: [Object]
})


const linkSchema = new mongoose.Schema({
  title: String,
  url: String
})


const commnetSchema = new mongoose.Schema({
  user: Object,
  question: String,
  questionReplies: [Object]
})


const courseDataSchema = new mongoose.Schema({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: String,
  videoPlayer: String,
  links: [linkSchema],
  suggestions: String,
  questions: [commnetSchema]
})


const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a course name"]
  },
  description: {
    type: String,
    required: [true, "Please provide a course description"]
  },
  price: {
    type: Number,
    required: [true, "Please provide a course price"]
  },
  estimatedPrice: {
    type: Number
  },
  thumbNail: {
    public_id: {
      type: String,
      // required: [true, "Please provide a thumbNail public_id"]
    },
    url: {
      type: String,
      // required: [true, "Please provide a thumbNail url"]
    }
  },
  tags: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: [true, "Please provide a course level"]
  },
  demoUrl: {
    type: String,
    required: [true, "Please provide a demo url"]
  },
  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  rating: {
    type: Number,
    default: 0
  },
  purchased: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})


const courseModel = mongoose.model("Course", courseSchema);
export default courseModel;