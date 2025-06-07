import { RouterProvider } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import AddProduct from "./pages/products/addProduct";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import AddHomeSlide from "./pages/homeSliderBanners/addHomeSlide";
import AddCategory from "./pages/category/addCategroy";
import AddSubCategory from "./pages/category/addSubCategroy";
import router from "../src/routes";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import { AppBar } from "@mui/material";
import AddAddress from "./pages/address/addAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MyContext = createContext();

<router />;

function App() {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [address, setAddress] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
  });
  const handleCloseFullScreenPanel = () => {
    setIsOpenFullScreenPanel((open = false));
  };

  const notify = (msg, type) => {
    const types = {
      success: () => toast.success(msg),
      error: () => toast.error(msg),
      warning: () => toast(msg, { icon: "⚠️" }),
      info: () => toast(msg, { icon: "ℹ️" }),
    };
    (types[type] || (() => toast(msg)))();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLogin(true);
        setUserData(null); // Reset before fetching
        try {
          const res = await fetchDataFromApi("/api/user/user-details");
          const data = res?.data;
          setUserData(data);
        } catch (error) {
          setIsLogin(false);
          setUserData(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          notify("Failed to fetch user details. Please login again.", "error");
        }
      } else {
        setIsLogin(false);
        setUserData(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
          notify("Your session is closed Please login again", "error");
        }
      }
    };

    fetchUserDetails();
  }, []);

  const values = {
    isSideBarOpen,
    setIsSideBarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    notify,
    setUserData,
    userData,
    address,
    setAddress
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={handleCloseFullScreenPanel}
          slots={{ transition: Transition }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseFullScreenPanel}
                aria-label="close"
              >
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {isOpenFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
          {isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
        </Dialog>
      </MyContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
