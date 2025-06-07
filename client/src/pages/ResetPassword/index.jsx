import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

const ResetPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
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
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-black text-[18px]">
              Reset Password
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5 relative">
                <TextField
                  type={isShowPassword === false ? "password" : "text"}
                  id="password"
                  label="New Password"
                  variant="outlined"
                  className="w-full"
                  name="newPassword"
                  onChange={onChangeInput}
                  value={formFields.newPassword}
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
              <div className="form-group w-full mb-5 relative">
                <TextField
                  type={isShowPassword2 === false ? "password" : "text"}
                  id="confirm_password"
                  label="Confirm Password"
                  variant="outlined"
                  className="w-full"
                  name="confirmPassword"
                  onChange={onChangeInput}
                  value={formFields.confirmPassword}
                  disabled={isLoading === true ? true : false}
                />
                <Button
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                >
                  {isShowPassword2 === false ? (
                    <IoMdEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>

              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  className="btn-org btn-lg w-full"
                  disabled={isLoading === true ? true : false}
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;