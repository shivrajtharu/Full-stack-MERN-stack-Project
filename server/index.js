import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./src/config/connectDb.js";
import router from "./src/config/router.config.js";
import multer from "multer";

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

// Error-handling middleware
app.use((error, req, res, next) => {
  console.error("Error caught:", error);

  let code = 500;
  let msg = "Internal Server Error";
  let status = "SERVER_ERROR";
  let detail = null;

  // Multer-specific errors (e.g., wrong field name, large file)
  if (error instanceof multer.MulterError) {
    code = 400;
    status = "BAD_REQUEST";
    msg = "File upload error";

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      msg = "Unexpected file field";
      detail = {
        [error.field || "file"]: "Unexpected field or too many files uploaded",
      };
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      msg = "File too large";
      detail = {
        [error.field || "file"]: "File size exceeds 3MB limit",
      };
    }
  }

  // Handle your custom validation error thrown in fileFilter
  if (
    typeof error === "object" &&
    typeof error.code === "number" &&
    error.message &&
    error.status
  ) {
    code = error.code;
    msg = error.message;
    status = error.status;
    detail = error.detail || null;
  }

  // Mongoose/Mongo error handling
  if (error.name === "MongooseError" || error.name === "MongoServerError") {
    code = 400;
    status = "VALIDATION_FAILED";

    if (+error.cause?.code === 11000) {
      msg = "Unique Validation Failed";
      let failedField = Object.keys(error.cause.keyPattern || {}).pop();
      detail = {
        [failedField]: error.message,
      };
    }
  }

  // Ensure status code is a number
  code = typeof code === "number" ? code : 500;

  res.status(code).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});
