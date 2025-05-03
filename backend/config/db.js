import mongoose from "mongoose"; // we neeed to connect database

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // proccess code 1 means exit with failure, 0 means success.
  }
};
