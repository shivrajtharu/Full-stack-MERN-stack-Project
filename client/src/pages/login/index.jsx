import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";


const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const forgotPassword = async () => {
    if (formFields.email === "") {
      context.notify("Please Enter Your Email Id", "error");
      return false;
    }
    try {
      context.notify("Processing...", "info");
      const res = await postData('/api/user/forgot-password', {
        email: formFields.email,
      });
      if (res?.error !== true) {
        context.notify(res?.message || `Verification code sent. Please check your email!`, "success");
        localStorage.setItem("userEmail", formFields.email);
        localStorage.setItem("actionType", "forgot-password");
        navigate("/verify");
      } else {
        context.notify(res?.message || "Failed to send verification code. Please try again.", "error");
      }
    } catch (err) {
      context.notify(
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred. Please try again.",
        "error"
      );
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      return {
        ...prevFields,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // page will not reload

    setIsLoading(true);

    if (formFields.email === "") {
      context.notify("Please Enter Your Email Id", "error");
      setIsLoading(false);
      return false;
    }

    if (formFields.password === "") {
      context.notify("Please Enter Your Password", "error");
      setIsLoading(false);
      return false;
    }

    postData("/api/user/login", formFields, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        if (res.error !== true) {
          context.notify(res?.message || "Login successful!", "success");
          setFormFields({
            email: "",
            password: "",
          });
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);

          context.setIsLogin(true);
          navigate("/");
        } else {
          context.notify(
            res?.message || "Login failed. Please check your credentials.",
            "error"
          );
        }
      })
      .catch((err) => {
        setIsLoading(false);
        context.notify("An error occurred. Please try again.", "error");
      });
  };

  return (
    <>
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-black text-[18px]">
              Login to your account
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5">
                <TextField
                  type="email"
                  id="email"
                  label="Email Id"
                  variant="outlined"
                  className="w-full"
                  name="email"
                  onChange={onChangeInput}
                  value={formFields.email}
                  disabled={isLoading === true ? true : false}
                />
              </div>
              <div className="form-group w-full mb-5 relative">
                <TextField
                  type={isShowPassword === false ? "password" : "text"}
                  id="password"
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  name="password"
                  onChange={onChangeInput}
                  value={formFields.password}
                  disabled={isLoading === true ? true : false}
                />
                <Button
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === false ? (
                    <IoMdEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>

              <button
                type="button"
                className="link cursor-pointer text-[14px] font-[600] bg-transparent border-none p-0"
                onClick={forgotPassword}
                style={{ textAlign: "left" }}
              >
                Forgot Password?
              </button>

              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  className="btn-org btn-lg w-full"
                  type="submit"
                  disabled={isLoading === true ? true : false}
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>

              <p className="text-center">
                Not Registered?
                <Link
                  to="/register"
                  className="link text-[14px] font-[600] ml-1 text-primary"
                >
                  Sign Up
                </Link>
              </p>

              <p className="text-center font-[500]">
                Or Continue with social account
              </p>

              <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
                <FcGoogle className="text-[22px]" />
                Login with Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
