import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import userSvc from "../services/user.service.js";
import verificationEmail from "../utils/verifyEmail-template.js";
import jwt from "jsonwebtoken";
import generatedAccessToken from "../utils/generated-AcessToken.js";
import generatedRefreshToken from "../utils/generated-refreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
var ImagesArr = [];

class UserController {
  registerUser = async (req, res, next) => {
    try {
      let user;
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          code: 400,
          error: true,
          success: false,
          message: "Name, email, and password are required.",
          status: "BAD_REQUEST",
        });
      }

      user = await UserModel.findOne({ email: email });
      if (user) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "User already registered with this email.",
          status: "USER_ALREADY_EXISTS",
        });
      }

      // Create a new user
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Generate a 6-digit verification code
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      user = new UserModel({
        name: name,
        email: email,
        password: hashPassword,
        otp: verifyCode,
        otpExpires: Date.now() + 600000, //  opt expires in 10 minutes
      });
      await user.save();

      // Send verification code via email
      await userSvc.sendEmailFunc(
        email,
        "Verify email from ecommerce app",
        "Please verify your email address",
        verificationEmail(name, verifyCode)
      );

      // Create JWT token for verification proposes
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.SECRET_KEY_ACCESS_TOKEN
      );

      res.json({
        error: false,
        success: true,
        message: "User registered successfully. Please verify your email.",
        status: "USER_REGISTERED",
        token: token,
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "User not found.",
          status: "USER_NOT_FOUND",
        });
      }

      const isCodeValid = user.otp === otp;
      const isCodeNotExpired = user.otpExpires > Date.now();

      if (isCodeValid && isCodeNotExpired) {
        user.verify_email = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.json({
          code: 200,
          error: false,
          success: true,
          message: "Email verified successfully.",
          status: "EMAIL_VERIFIED",
        });
      } else if (!isCodeValid) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Invalid verification code.",
          status: "INVALID_VERIFICATION_CODE",
        });
      } else {
        return res.status(422).json({
          error: true,
          success: false,
          code: 422,
          message: "Verification code has expired. Please request a new one.",
          status: "VERIFICATION_CODE_EXPIRED",
        });
      }
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "User not registered with this email.",
          status: "USER_NOT_ReGISTERED",
        });
      }

      if (user.status !== "Active") {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Contact admin to activate your account.",
          status: "USER_ACCOUNT_NOT_ACTIVE",
        });
      }

      if (user.verify_email !== true) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Your email is not verified yet Please verify your email.",
          status: "EMAIL_NOT_VERIFIED",
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Invalid password.",
          status: "INVALID_PASSWORD",
        });
      }

      // Generate access and refresh tokens
      const accessToken = await generatedAccessToken(user._id);
      const refreshToken = await generatedRefreshToken(user._id);

      // Update user's last login date
      const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      });

      // Set cookies for access and refresh tokens
      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      res.cookie("accessToken", accessToken, cookiesOption);
      res.cookie("refreshToken", refreshToken, cookiesOption);

      res.json({
        error: false,
        success: true,
        message: "User Logged in Successfully",
        status: "USER_LOGGED_IN",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  logoutUser = async (req, res, next) => {
    try {
      const userid = req.userId;

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      // Clear cookies
      res.clearCookie("accessToken", cookiesOption);
      res.clearCookie("refreshToken", cookiesOption);

      const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
        refresh_token: "",
      });

      res.json({
        code: 200,
        error: false,
        success: true,
        message: "User logged out successfully.",
        status: "USER_LOGGED_OUT",
      });
    } catch (exception) {
      next(exception);
    }
  };

  // upload and update user avatar
  userAvatar = async (req, res, next) => {
    try {
      ImagesArr = [];
      const userId = req.userId;
      const image = req.files;

      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "User not found.",
          status: "USER_NOT_FOUND",
        });
      }

      // Check if the user already has an avatar and remove it from Cloudinary
      const userAvatar = user?.avatar;
      const imgUrl = userAvatar;
      const urlArr = imgUrl.split("/");
      const imageName = urlArr[urlArr.length - 1].split(".")[0];

      if (imageName) {
        const res = await cloudinary.uploader.destroy(
          imageName,
          (error, result) => {}
        );
      }

      // Upload images to Cloudinary
      const options = {
        usefilename: true,
        unique_filename: false,
        overwrite: false,
      };

      for (let i = 0; i < image?.length; i++) {
        try {
          const result = await cloudinary.uploader.upload(
            image[i].path,
            options
          );
          ImagesArr.push(result.secure_url);
          fs.unlinkSync(image[i].path); // Delete the local file after upload
          console.log(image[i].filename);
        } catch (error) {
          return res.status(500).json({
            code: 500,
            error: true,
            success: false,
            message: "Error uploading image.",
            status: "UPLOAD_ERROR",
            error: error.message,
          });
        }
      }

      // Update user avatar in the database
      user.avatar = ImagesArr[0];
      await user.save();

      return res.json({
        error: false,
        success: true,
        _id: userId,
        avatar: ImagesArr[0],
      });
    } catch (exception) {
      next(exception);
    }
  };

  // remove image from cloudinary and database
  removeImage = async (req, res, next) => {
    try {
      const imgUrl = req.query.img;
      const userId = req.userId;
      const urlArr = imgUrl.split("/");
      const imageName = urlArr[urlArr.length - 1].split(".")[0];

      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
        if (result.result === "ok") {
          // Remove avatar from user document
          await UserModel.findByIdAndUpdate(userId, { avatar: "" });

          return res.json({
            error: false,
            success: true,
            message: "Image removed successfully.",
            status: "IMAGE_REMOVED",
          });
        } else {
          return res.status(500).json({
            code: 500,
            error: true,
            success: false,
            message: "Failed to remove image.",
            status: "IMAGE_REMOVE_FAILED",
          });
        }
      }
    } catch (exception) {
      next(exception);
    }
  };

  updateUserDetails = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { name, email, mobile, password } = req.body;

      const userExist = await UserModel.findById(userId);
      if (!userExist) {
        return res.status(400).json({
          error: true,
          success: false,
          code: 404,
          message: "User not found, The user cannot be updated!",
          status: "USER_NOT_FOUND",
        });
      }

      const emailChanged = email !== userExist.email;
      let verifyCode = "";

      if (emailChanged) {
        verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      }

      const hashPassword = password
        ? await bcrypt.hash(password, await bcrypt.genSalt(10))
        : userExist.password;

      const updateUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          name,
          password: hashPassword,
          email,
          mobile,
          verify_email: emailChanged ? false : userExist.verify_email,
          otp: emailChanged ? verifyCode : null,
          otpExpires: emailChanged ? Date.now() + 600000 : null,
        },
        { new: true }
      );

      const responsePayload = {
        error: false,
        success: true,
        message: emailChanged
          ? "User details updated successfully. Please verify your new email."
          : "User details updated successfully.",
        status: "USER_DETAILS_UPDATED",
        data: {
          _id: updateUser?._id,
          name: updateUser?.name,
          email: updateUser?.email,
          mobile: updateUser?.mobile,
        },
      };

      res.json(responsePayload);

      //  Send verification email only if the email was changed
      if (emailChanged) {
        userSvc
          .sendEmailFunc(
            email,
            "Verify your email",
            "Please verify your email address",
            verificationEmail(name, verifyCode)
          )
          .catch(console.error);
      }
    } catch (exception) {
      next(exception);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Email not available",
          status: "EMAIL_NOT_FOUND",
        });
      }

      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = verifyCode;
      user.otpExpires = Date.now() + 600000;

      await user.save();

      await userSvc.sendEmailFunc(
        email,
        "Verify Otp from ecommerce app",
        "Please verify your forgot pasword otp",
        verificationEmail(user.name, verifyCode)
      );

      res.json({
        error: false,
        success: true,
        message: "Verification code sent. Please check you email",
        status: "VERIFICATION_CODE_SENT",
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgotPasswordOtp = async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Email not available",
          status: "EMAIL_NOT_FOUND",
        });
      }

      if (otp !== user.otp) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Invalid Otp",
          status: "INVALID_OTP",
        });
      }

      if (!email || !otp) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Provide Required field email, otp",
          status: "PROVIDE_REQUIRED_FIELD",
        });
      }

      const currentTime = new Date().toISOString();

      if (user.otpExpires < currentTime) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Otp is expired",
          status: "OTP_EXPIRED",
        });
      }

      user.otp = "";
      user.otpExpires = "";

      await user.save();

      return res.json({
        error: false,
        success: true,
        message: "Otp verified successfully",
        status: "OTP_VERIFIED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { email, newPassword, confirmPassword } = req.body;

      if (!email || !newPassword || !confirmPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message:
            "Provide Required fields email, newPassword, confirmPassword",
          status: "PROVIDE_REQUIRED_FIELDS",
        });
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Email not available",
          status: "email not found",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "New Password and Confirm Password must be same.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(confirmPassword, salt);

      user.password = hashPassword;
      await user.save();

      return res.json({
        error: false,
        success: true,
        message: "Password Updated Successfully",
        status: "PASSWORD_UPDATED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { email, newPassword, confirmPassword, oldPassword } = req.body;

      if (!email || !newPassword || !confirmPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message:
            "Provide Required fields email, newPassword, confirmPassword",
          status: "PROVIDE_REQUIRED_FIELDS",
        });
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Email not available",
          status: "email not found",
        });
      }

      const checkPassword = await bcrypt.compare(oldPassword, user.password);

      if (!checkPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Old password is incorrect.",
          status: "INVALID_PASSWORD",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "New Password and Confirm Password must be same.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(confirmPassword, salt);

      user.password = hashPassword;
      await user.save();

      return res.json({
        error: false,
        success: true,
        message: "Password Updated Successfully",
        status: "PASSWORD_UPDATED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const refreshToken =
        req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; // Bearer token

      if (!refreshToken) {
        return res.status(401).json({
          code: 401,
          error: true,
          success: false,
          message: "Invalid Token",
          status: "INVALID_TOKEN",
        });
      }

      const verifyToken = await jwt.verify(
        refreshToken,
        process.SECRET_KEY_REFRESH_TOKEN
      );

      if (!verifyToken) {
        return res.status(401).json({
          code: 401,
          error: true,
          success: false,
          message: "token is expired",
          status: "TOKEN_EXPIRED",
        });
      }

      const userId = verifyToken?._id;
      const newAccessToken = await generatedAccessToken(userId);

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("accessToken", newAccessToken, cookiesOption);

      return res.json({
        error: false,
        success: true,
        message: "New Access token generated",
        status: "TOKEN_GENERATED",
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserDetails = async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await UserModel.findById(userId)
        .populate("address_details")
        .select("-password -refresh_token");

      return res.json({
        error: false,
        success: true,
        message: "User Details",
        data: user,
        status: "DETAILS_FETCHED",
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();
export default userCtrl;
