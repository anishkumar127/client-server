import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://0.0.0.0:27017/projecttodo"
    );
    // connection.then(()=>  console.log("DB Connected!"))
    if (connection) {
      console.log("DB Connected");
    }
  } catch (error) {
    console.log("DB error", error);
  }
};
