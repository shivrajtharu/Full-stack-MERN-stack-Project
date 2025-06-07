import { Router } from "express";
import userCtrl from "../controllers/user.controller.js";
import permissionCheck from "../middlewares/auth.middleware.js";
import uploader from "../middlewares/multipart-handle.middleware.js";

const userRouter = Router();

userRouter.post('/register', userCtrl.registerUser);
userRouter.post('/verify-email', userCtrl.verifyEmail);  
userRouter.post('/login', userCtrl.loginUser);
userRouter.get('/logout', permissionCheck, userCtrl.logoutUser);
userRouter.get('/profile', permissionCheck,);
userRouter.put('/user-avatar', permissionCheck, uploader("image").array("avatar"), userCtrl.userAvatar);
userRouter.delete('/delete-image', permissionCheck, userCtrl.removeImage);
userRouter.put('/:id', permissionCheck, userCtrl.updateUserDetails);
userRouter.post('/forgot-password', userCtrl.forgotPassword);
userRouter.post('/verify-forgot-password-otp', userCtrl.verifyForgotPasswordOtp);
userRouter.post('/change-password', userCtrl.changePassword);
userRouter.post('/reset-password', userCtrl.resetPassword)
userRouter.post('/refresh-token', userCtrl.refreshToken);
userRouter.get('/user-details', permissionCheck, userCtrl.getUserDetails);

export default userRouter;  