import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import OtpBox from "../../components/otpBox/indx";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const verifyOTP = (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      context.notify("User email not found. Please try again.", "error");
      return;
    }

    const actionType = localStorage.getItem("actionType");

    if (actionType !== "forgot-password") {
      postData("/api/user/verify-email", {
        email: userEmail,
        otp: otp,
      })
        .then((res) => {
          if (res?.success === true) {
            context.notify(
              res?.message || "Verification successful!",
              "success"
            );
            localStorage.removeItem("userEmail");

            const verifySource = localStorage.getItem("verifySource");
            localStorage.removeItem("verifySource");

            if (verifySource === "register") {
              navigate("/login");
            } else if (verifySource === "profile") {
              navigate("/profile");
            } else {
              navigate("/"); // fallback
            }
          } else {
            context.notify(
              res?.message || "Invalid OTP. Please try again.",
              "error"
            );
          }
        })
        .catch(() => {
          context.notify(
            "An error occurred while verifying OTP. Please try again.",
            "error"
          );
        });
    } else {
      postData("/api/user/verify-forgot-password-otp", {
        email: userEmail,
        otp: otp,
      })
        .then((res) => {
          if (res?.success === true) {
            context.notify(
              res?.message || "Verification successful!",
              "success"
            );
            navigate("/reset-password");
          } else {
            context.notify(
              res?.message || "Invalid OTP. Please try again.",
              "error"
            );
          }
        })
        .catch((err) => {
          context.notify(
            "An error occurred while verifying OTP. Please try again.",
            "error"
          );
        });
    }
  };

  return (
    <>
      <section className="bg-white w-full h-screen ">
        <header className="w-full px-4 py-3 flex items-center justify-between z-50 fixed top-0 left-0">
          <div className="py-2 w-full">
            <Link to={"/"}>
              <img src="/logo.png" className="w-[150px]" />
            </Link>
          </div>

          <div className="flex items-center gap-1 mr-2">
            <NavLink to={"/login"} exact={true} activeClassName="isActive">
              <Button className="!text-[rgba(0,0,0,0.8)] !rounded-full !px-4 gap-2 flex">
                <CgLogIn className="text-[18px]" />
                <span className="whitespace-nowrap">Login</span>
              </Button>
            </NavLink>

            <NavLink to={"/sign-up"} exact={true} activeClassName="isActive">
              <Button className="!text-[rgba(0,0,0,0.8)] !rounded-full !px-4 gap-2 flex items-center">
                <FaRegUser className="text-[15px]" />
                <span className="whitespace-nowrap">Sign Up</span>
              </Button>
            </NavLink>
          </div>
        </header>
        <img
          src="/pattern.png"
          className="w-full fixed top-0 left-0 opacity-5"
        />

        <div className="loginBox card w-[600px] h-auto mx-auto pt-20 relative z-50 pb-20">
          <div className="text-center">
            <img src="/verify.png" className="m-auto w-[100px]" />
          </div>

          <h1 className="text-center text-[35px] font-[800] mt-4">
            Welcome Back! <br />
            Please Verify Your Email
          </h1>

          <br />
          <p className="text-center text-[15px]">
            OTP send to &nbsp;
            <span className="text-primary font-bold">
              {" "}
              {localStorage.getItem("userEmail")}
            </span>
          </p>

          <form onSubmit={verifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="mt-5 w-[300px] m-auto">
              <Button type="submit" className="w-full btn-blue btn-lg">
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyAccount;
