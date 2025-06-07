import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { editData } from "../../utils/api";
import { LuMapPinPlus } from "react-icons/lu";


const AccountSideBar = () => {
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const avatar = context?.userData?.avatar;
    if (avatar && avatar !== "false") {
      setPreviews([avatar]);
    } else {
      setPreviews([]);
    }
  }, [context?.userData?.avatar]);

  let img_arr = [];
  let uniqueArray = [];
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
      <div className="card bg-white shadow-md rounded-md sticky top-[20px]">
        <div className="w-full p-5 flex flex-col items-center justify-center">
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
          
          <h3>{context?.userData?.name || "User"}</h3>
          <h6 className="leading-3 text-[13px] font-[500]">
            {context?.userData?.email || "userEmail"}
          </h6>
        </div>
        <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
          <li className="w-full">
            <NavLink to="/my-account" exact={true} activeClassName="isActive">
              <Button className="flex !capitalize !text-left !justify-start !px-5 items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !py-2">
                <FaRegUser className="text-[15px]" />
                My Profile
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="/address" exact={true} activeClassName="isActive">
              <Button className="flex !capitalize !text-left !justify-start !px-5 items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !py-2">
                <LuMapPinPlus className="text-[18px]" />
                Address
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="/my-list" exact={true} activeClassName="isActive">
              <Button className="flex !capitalize !text-left !justify-start !px-5 items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !py-2">
                <FaRegHeart className="text-[17px]" />
                My List
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="/my-orders" exact={true} activeClassName="isActive">
              <Button className="flex !capitalize !text-left !justify-start !px-5 items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !py-2">
                <IoBagCheckOutline className="text-[17px]" />
                My Orders
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="/logout" exact={true} activeClassName="isActive">
              <Button className="flex !capitalize !text-left !justify-start !px-5 items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !py-2">
                <IoIosLogOut className="text-[18px]" />
                Logout
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountSideBar;
