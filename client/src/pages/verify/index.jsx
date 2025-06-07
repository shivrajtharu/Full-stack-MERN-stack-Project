import { useContext, useState } from "react";
import OtpBox from "../../components/otpBox";
import { Button } from "@mui/material";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
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
              navigate("/my-account");
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
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <div className="text-center flex items-center justify-center">
              <img src="verify.png" width="80" />
            </div>
            <h3 className="text-center text-black text-[18px] mt-3 mb-1">
              Verify OTP
            </h3>
            <p className="text-center mt-0 mb-4">
              OTP sent to{" "}
              <span className="text-primary font-bold">
                {localStorage.getItem("userEmail")}
              </span>
            </p>

            <form onSubmit={verifyOTP}>
              <OtpBox length={6} onChange={handleOtpChange} />

              <div className="flex items-center justify-center mt-5 px-3">
                <Button type="submit" className="w-full btn-org btn-lg">
                  Verify OTP
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;
