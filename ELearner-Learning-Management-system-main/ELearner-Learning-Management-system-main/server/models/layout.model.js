import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
})

const categorySchema = new mongoose.Schema({
  title: String
})

const bannerImageSchema = new mongoose.Schema({
  public_id: String,
  url: String
})

const layoutSchema = new mongoose.Schema({
  type: String,
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    Image: [bannerImageSchema],
    title: String,
    subtitle: String,
  }
})


const layoutModel = mongoose.model("Layout", layoutSchema);
export default layoutModel;