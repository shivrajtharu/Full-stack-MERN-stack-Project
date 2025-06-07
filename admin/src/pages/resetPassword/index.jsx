  import { Button, CircularProgress } from "@mui/material";
  import { Link, NavLink, useNavigate } from "react-router-dom";
  import { CgLogIn } from "react-icons/cg";
  import { FaRegUser } from "react-icons/fa6";
  import { useState } from "react";
  import { FaRegEye } from "react-icons/fa";
  import { FaEyeSlash } from "react-icons/fa";
  import { useContext } from "react";
  import { MyContext } from "../../App";
  import { postData } from "../../utils/api";

  const ResetPassword = () => {
    const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
    const [isConfirmPassShow, setIsConfirmPassShow] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({
      email: localStorage.getItem("userEmail"),
      newPassword: "",
      confirmPassword: "",
    });

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

      if (formFields.newPassword === "") {
        context.notify("Please Enter Your New Password", "error");
        setIsLoading(false);
        return false;
      }

      if (formFields.confirmPassword === "") {
        context.notify("Please Enter Confirm Password", "error");
        setIsLoading(false);
        return false;
      }

      if (formFields.confirmPassword !== formFields.newPassword) {
        context.notify("Password and Confirm Password must be same", "error");
        setIsLoading(false);
        return false;
      }

      postData("/api/user/reset-password", formFields)
        .then((res) => {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("actionType");
          setIsLoading(false);
          if (res.error !== true) {
            context.notify(
              res?.message || "Password Changed successfully!",
              "success"
            );
            setFormFields({
              email: "",
              newPassword: "",
              confirmPassword: "",
            });
            navigate("/login");
          } else {
            context.notify(res?.message || "Unable to change Password", "error");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          context.notify("An error occurred. Please try again.", "error");
        });
    };

    return (
      <>
        <section className="bg-white w-full ">
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
              <img src="/logo2.png" className="m-auto w-[100px]" />
            </div>

            <h1 className="text-center text-[35px] font-[800] mt-4">
              Welcome Back! <br />
              You can Reset your password from here
            </h1>

            <br />

            <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-4">
                <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
                <div className="w-full relative">
                  <input
                    type={isNewPasswordShow === false ? "password" : "text"}
                    name="newPassword"
                    onChange={onChangeInput}
                    value={formFields.newPassword}
                    disabled={isLoading === true ? true : false}
                    className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                  />

                  <Button
                    className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
                !h-[35px] !min-w-[35px] !text-gray-600"
                    onClick={() => setIsNewPasswordShow(!isNewPasswordShow)}
                  >
                    {isNewPasswordShow === true ? (
                      <FaEyeSlash className="text-[18px]" />
                    ) : (
                      <FaRegEye className="text-[18px]" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="form-group w-full mb-5">
                <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
                <div className="w-full relative">
                  <input
                    type={isConfirmPassShow === false ? "password" : "text"}
                    name="confirmPassword"
                    onChange={onChangeInput}
                    value={formFields.confirmPassword}
                    disabled={isLoading === true ? true : false}
                    className="w-full h-[50px] border-2 border-[(rgba(0,0,0,0.1))] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                  />

                  <Button
                    className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
                !h-[35px] !min-w-[35px] !text-gray-600"
                    onClick={() => setIsConfirmPassShow(!isConfirmPassShow)}
                  >
                    {isConfirmPassShow === true ? (
                      <FaEyeSlash className="text-[18px]" />
                    ) : (
                      <FaRegEye className="text-[18px]" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                className="btn-blue btn-lg w-full"
                type="submit"
                disabled={isLoading === true ? true : false}
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </div>
        </section>
      </>
    );
  };

  export default ResetPassword;
