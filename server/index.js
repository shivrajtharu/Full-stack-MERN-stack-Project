import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./src/config/connectDb.js";
import router from "./src/config/router.config.js";

dotenv.config();

const app = express(); // Create an Express application
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // Use Helmet for security headers

app.get("/", (req, res) => {
  // server to client
  res.json({
    message: "Server is running" + process.env.PORT,
  });
});

// Routing config
app.use("/api/", router); // application level routing middleware

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
  });
});

// 404 router
app.use((req, res, next) => {
  next({ code: 404, message: "Resource not found", status: "NOT_FOUND" });
});

// error handling middleware
app.use((error, req, res, next) => {
  // console.log(error);
  let code = error.code || 500;
  let msg = error.message || "Internal Server Error";
  let status = error.status || "SERVER_ERROR";
  let detail = error.detail || null;

  // custom error handling
  // if (error instanceof MulterError){
  //     code = 400;
  //     msg = "File upload error";
  //     status = "BAD_REQUEST";

  //   if (error.code === "LIMIT_UNEXPECTED_FILE") {
  //     detail = {
  //       [error.field]: "image upload is not allowed"
  //     }
  //   }
  //   if (error.code === "LIMIT_FILE_SIZE") {
  //     detail = {
  //       [error.field]: "File size is too large"
  //     }
  //   }
  // }

  if (error.name === "MongooseError" || error.name === "MongoServerError") {
    code = 400;
    status = "VALIDATION_FAILED";

    if (+error.cause.code === 11000) {
      // unique validation failed
      msg = "Unique Validation Failed";
      let failedField = Object.keys(error.cause.keyPattern).pop();
      detail = {
        [failedField]: error.message,
      };
    }
  }

  res.status(code).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});
