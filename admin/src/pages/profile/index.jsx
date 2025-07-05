import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";
import { TextField } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Radio from "@mui/material/Radio";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Profile = () => {
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
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

  const [selectedValue, setSelectedValue] = useState(
    "Hattiban-23 Satdobato Kathmandu Nepal Bagmati 234522"
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (context?.userData?._id && context?.userData?._id !== "false") {
      setUserId(context?.userData?._id);

      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
        context?.setAddress(res.address);
      });

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

  useEffect(() => {
    const avatar = context?.userData?.avatar;
    if (avatar && avatar !== "false") {
      setPreviews([avatar]);
    } else {
      setPreviews([]);
    }
  }, [context?.userData?.avatar]);

  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file &&
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          const formdata = new FormData();
          formdata.append("avatar", file);

          const res = await editData(apiEndPoint, formdata);
          setUploading(false);

          if (res?.avatar && res.avatar !== "false") {
            setPreviews([res.avatar]);
          } else {
            setPreviews([]);
          }
        } else {
          context.notify(
            "Only JPG, JPEG, PNG, or WEBP images are allowed.",
            "error"
          );
          setUploading(false);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg w-[65%] bg-white pt-5 pb-5 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">User Profile</h2>
          <Button
            className="!ml-auto"
            onClick={() =>
              setIsChangePasswordFormShow(!isChangePasswordFormShow)
            }
          >
            Changed Password
          </Button>
        </div>

        <br />

        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress color="inherit" />
          ) : previews.length > 0 ? (
            previews.map((img, index) => (
              <img
                src={img}
                key={index}
                className="w-full h-full object-cover"
                alt="User Avatar"
              />
            ))
          ) : (
            <img
              src="/user-image.png"
              className="w-full h-full object-cover"
              alt="Default Avatar"
            />
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 h-full w-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            ></input>
          </div>
        </div>
        <br />
        <hr />
        <form
          className=" form mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                name="name"
                onChange={onChangeInput}
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>

            <div className="w-[50%]">
              <input
                type="email"
                name="email"
                onChange={onChangeInput}
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>
          </div>

          <div className="w-[49%] mt-4">
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

          <br />

          <div
            className="flex items-center justify-center hover:bg-[#e7f3f9] rounded-md  p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            <span className="text-[14px] font-[500]"> Add Address</span>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {context.address?.length > 0 &&
              context.address?.map((address, index) => {
                return (
                  <>
                    <label className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer  border border-dashed border-[rgba(0,0,0,0.2)]">
                      <Radio
                        {...label}
                        name="address"
                        checked={selectedValue === address?._id}
                        value={address?._id}
                        onChange={handleChange}
                      />
                      <span className="text-[12px]">
                        {address?.address_line1 +
                          " " +
                          address?.city +
                          " " +
                          address?.country +
                          " " +
                          address?.provision +
                          " " +
                          address?.pincode}
                      </span>
                    </label>
                  </>
                );
              })}
          </div>

          <br />
          <div className="flex items-center">
            <Button
              type="submit"
              className="btn-blue btn-lg w-full"
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
        <div className="card bg-white w-[65%] shadow-md rounded-md p-5 mb-5">
          <div className="flex items-center pb-3">
            <h2 className="pb-0 text-[18px] font-[600]">Change Password</h2>
          </div>
          <hr />
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitChangePassword(e);
            }}
          >
            <div className="flex items-center gap-5">
              <div className="w-[50%] form-group relative">
                <TextField
                  label="Old Password"
                  type={isShowPassword === false ? "password" : "text"}
                  variant="outlined"
                  size="small"
                  className="w-full"
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
                  className="w-full"
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
              <div className="w-[49%] form-group relative">
                <TextField
                  label="Confirm Password"
                  type={isShowPassword3 === false ? "password" : "text"}
                  variant="outlined"
                  size="small"
                  className="w-full"
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
                className="btn-blue btn-lg w-[250px]"
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
    </>
  );
};

export default Profile;
