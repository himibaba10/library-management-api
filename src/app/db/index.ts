import mongoose from "mongoose";

const db = async () => {
  await mongoose.connect(process.env.DB_URL as string);
  console.log("Database is connected successfully!");
};

export default db;
