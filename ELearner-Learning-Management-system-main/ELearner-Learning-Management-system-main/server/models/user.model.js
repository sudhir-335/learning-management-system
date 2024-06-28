import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()


const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"]
  },
  email: {
    type: String,
    require: [true, "Please Enter your Email"],
    validate: {
      validator: function (value) {
        return emailRegexPattern.test(value)
      },
      message: "Please enter a valid email",
    },
    unique: true
  },
  password: {
    type: String,
    minlength: [6, "Password should of Minimum six length"],
    select: false
  },
  avatar: {
    public_id: String,
    url: String
  },
  role: {
    type: String,
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  courses: [
    {
      courseId: String
    }
  ]
}, { timestamps: true })






// hash the password before saving 
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})


// compare the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


// sign access token 
userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m"
  })
}




// sign refresh token
userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d"
  })
}






const userModel = mongoose.model("User", userSchema);
export default userModel;