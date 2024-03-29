import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    
    console.log(`Database connected successfully on ${url}`);
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};

export default dbConnection;