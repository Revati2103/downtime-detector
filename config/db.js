require('dotenv').config();
const mongoose = require('mongoose')

//updated mongo env var name for vercel

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Connected ${conn.connection.host}`)
    mongoose.set('strictQuery', true);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;