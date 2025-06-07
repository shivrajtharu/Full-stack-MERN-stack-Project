import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountSideBar from "../../components/accountSideBar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
  const [phone, setPhone] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);
  const [userId, setUserId] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (context?.userData?._id && context?.userData?._id !== "false") {
      setUserId(context?.userData?._id);

      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      setChangePassword({
        email: context?.userData?.email,
      });

      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph);
    }
  }, [context?.userData?._id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      return {
        ...prevFields,
        [name]: value,
      };
    });

    setChangePassword((prevFields) => {
      return {
        ...prevFields,
        [name]: value,
      };
    });
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    // Validation checks
    if (!changePassword.oldPassword) {
      context.notify("Please Enter Your Old Password", "error");
      setIsLoading2(false);
      return;
    }

    if (!changePassword.newPassword) {
      context.notify("Please Enter Your New Password", "error");
      setIsLoading2(false);
      return;
    }

    if (!changePassword.confirmPassword) {
      context.notify("Please Enter Confirm Password", "error");
      setIsLoading2(false);
      return;
    }

    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.notify("Password and Confirm Password must be same", "error");
      setIsLoading2(false);
      return false;
    }

    postData("/api/user/change-password", changePassword, {
      withCredentials: true,
    })
      .then((res) => {
        setIsLoading2(false);
        if (res.error !== true) {
          context.notify(
            res?.message || "Password Changed successfully!",
            "success"
          );
          setChangePassword({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          context.notify(res?.message || "Unable to change Password", "error");
        }
      })
      .catch((error) => {
        setIsLoading2(false);
        context.notify("An error occurred. Please try again.", "error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation checks
    if (!formFields.name) {
      context.notify("Please Enter Your Full Name", "error");
      setIsLoading(false);
      return;
    }

    if (!formFields.email) {
      context.notify("Please Enter Your Email Id", "error");
      setIsLoading(false);
      return;
    }

    if (!formFields.mobile) {
      context.notify("Please Enter Your Phone Number", "error");
      setIsLoading(false);
      return;
    }

    const previousEmail = context?.userData?.email;

    editData(`/api/user/${userId}`, formFields)
      .then((res) => {
        setIsLoading(false);

        if (res?.error !== true) {
          context.notify(
            res.message || "Profile updated successfully!",
            "success"
          );

          const emailChanged = previousEmail !== formFields.email;

          if (emailChanged) {
            localStorage.setItem("userEmail", formFields.email);
            localStorage.setItem("verifySource", "profile");

            navigate("/verify");
          }
        } else {
          context.notify(
            res?.message || "Failed to update profile. Please try again.",
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
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-[50%]">
            <div className="card bg-white shadow-md rounded-md p-5 mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">My Profile</h2>
                <Button
                  className="!ml-auto"
                  onClick={() =>
                    setIsChangePasswordFormShow(!isChangePasswordFormShow)
                  }
                >
                  Changed Password
                </Button>
              </div>

              <hr />
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                  <div className="w-[50%]">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="name"
                      onChange={onChangeInput}
                      value={formFields.name}
                      disabled={isLoading === true ? true : false}
                    />
                  </div>

                  <div className="w-[50%]">
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="email"
                      onChange={onChangeInput}
                      value={formFields.email}
                      disabled={isLoading === true ? true : false}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4 gap-5">
                  <div className="w-[49%]">
                    <PhoneInput
                      defaultCountry="np"
                      value={phone}
                      onChange={(phone) => {
                        setPhone(phone);
                        setFormFields((prevFields) => ({
                          ...prevFields,
                          mobile: phone,
                        }));
                      }}
                      disabled={isLoading === true ? true : false}
                    />
                  </div>
                </div>

                <br />
                <div className="flex items-center">
                  <Button
                    type="submit"
                    className="btn-org btn-lg w-[200px]"
                    disabled={isLoading === true ? true : false}
                  >
                    {isLoading === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <Collapse isOpened={isChangePasswordFormShow}>
              <div className="card bg-white shadow-md rounded-md p-5">
                <div className="flex items-center pb-3">
                  <h2 className="pb-0">Change Password</h2>
                </div>
                <hr />
                <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                  <div className="flex items-center gap-5">
                    <div className="w-[50%] form-group relative">
                      <TextField
                        label="Old Password"
                        type={isShowPassword === false ? "password" : "text"}
                        variant="outlined"
                        size="small"
                        className="w-full bg-[#f1f1f1]"
                        name="oldPassword"
                        onChange={onChangeInput}
                        value={changePassword.oldPassword}
                        disabled={isLoading2 === true ? true : false}
                      />
                      <Button
                        className="!absolute top-[3px] right-[3px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword === false ? (
                          <IoMdEye className="text-[20px] opacity-75" />
                        ) : (
                          <IoMdEyeOff className="text-[20px] opacity-75" />
                        )}
                      </Button>
                    </div>

                    <div className="w-[50%] form-group relative">
                      <TextField
                        label="New Password"
                        type={isShowPassword2 === false ? "password" : "text"}
                        variant="outlined"
                        size="small"
                        className="w-full bg-[#f1f1f1]"
                        name="newPassword"
                        onChange={onChangeInput}
                        value={changePassword.newPassword}
                        disabled={isLoading2 === true ? true : false}
                      />
                      <Button
                        className="!absolute top-[3px] right-[3px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                        onClick={() => setIsShowPassword2(!isShowPassword2)}
                      >
                        {isShowPassword2 === false ? (
                          <IoMdEye className="text-[20px] opacity-75" />
                        ) : (
                          <IoMdEyeOff className="text-[20px] opacity-75" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 gap-5">
                    <div className="w-[50%] form-group relative">
                      <TextField
                        label="Confirm Password"
                        type={isShowPassword3 === false ? "password" : "text"}
                        variant="outlined"
                        size="small"
                        className="w-full bg-[#f1f1f1]"
                        name="confirmPassword"
                        onChange={onChangeInput}
                        value={changePassword.confirmPassword}
                        disabled={isLoading2 === true ? true : false}
                      />
                      <Button
                        className="!absolute top-[3px] right-[3px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                        onClick={() => setIsShowPassword3(!isShowPassword3)}
                      >
                        {isShowPassword3 === false ? (
                          <IoMdEye className="text-[20px] opacity-75" />
                        ) : (
                          <IoMdEyeOff className="text-[20px] opacity-75" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <br />
                  <div className="flex items-center">
                    <Button
                      type="submit"
                      className="btn-org btn-lg w-[200px]"
                      disabled={isLoading2 === true ? true : false}
                    >
                      {isLoading2 === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </Collapse>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
