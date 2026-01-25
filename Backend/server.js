// Importing Files
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoute from "./routes/chat.route.js";
import initData from "./init/init.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(
  cors({
    origin: "https://aiconvik-frontend.onrender.com/",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", chatRoute);
app.use("/initdata", initData); // for Initializing Random Data

//Server Listen
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} `);
  connectDB();
});

// Connection With DB
let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected To DB");
  } catch (error) {
    console.log(`Failed To Connect With DB ERROE ---> ${error}`);
  }
};
