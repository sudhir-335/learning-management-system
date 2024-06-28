import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbUrl = process.env.DB_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`Database connected successfully with ${data.connection.host}`);
    })
  }
  catch (Error) {
    console.log(Error.message)
    setTimeout(connectDB, 5000);
  }




}




export default connectDB



