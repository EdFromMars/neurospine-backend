import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    
    console.log(`Database connected successfully on ${url}`);
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};

export default dbConnection;