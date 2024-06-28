import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import layoutModel from "../models/layout.model.js";
import cloudinary from "cloudinary";


export const createLayout = CatchAsyncError(async (req, res, next) => {
  const { type } = req.body

  const isTypeExist = await layoutModel.findOne({ type })
  if (isTypeExist) {
    return next(new ErrorHandler("Layout already exists", 400))
  }

  if (type === "banner") {
    const { title, subtitle, image } = req.body
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout"
    })

    const banner = {
      title,
      subtitle,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }
    await layoutModel.create({ banner })
  }

  else if (type === "faq") {
    const { faq } = req.body
    await layoutModel.create({ type, faq })
  }

  else if (type === "categories") {
    const { categories } = req.body
    await layoutModel.create({ type, categories })
  }
  else {
    return next(new ErrorHandler("Invalid layout type", 400))
  }


  res.status(200).json({
    success: true,
    message: "Layout created successfully"
  })

})


// edit layout
export const editLayout = CatchAsyncError(async (req, res, next) => {
  const { type } = req.body
  const layout = await layoutModel.findOne({ type })
  if (!layout) {
    return next(new ErrorHandler("Layout not found", 404))
  }

  if (type === "banner") {
    const bannerData = await layoutModel.findOne({ type: "banner" })

    const { title, subtitle, image } = req.body
    if (bannerData) {
      await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
    }
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout"
    })

    const banner = {
      title,
      subtitle,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }
    await layoutModel.findOneAndUpdate({ type }, { banner })
  }

  else if (type === "faq") {
    const { faq } = req.body
    await layoutModel.findOneAndUpdate({ type }, { faq })
  }

  else if (type === "categories") {
    const { categories } = req.body
    await layoutModel.findOneAndUpdate({ type }, { categories })
  }
  else {
    return next(new ErrorHandler("Invalid layout type", 400))
  }

  res.status(200).json({
    success: true,
    message: "Layout updated successfully"
  })

})


// get layout by type
export const getLayout = CatchAsyncError(async (req, res, next) => {
  const { type } = req.body
  const layout = await layoutModel.findOne({ type })
  if (!layout) {
    return next(new ErrorHandler("Layout not found", 404))
  }

  res.status(200).json({
    success: true,
    layout
  })

})