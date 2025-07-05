import { RouterProvider } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import router from "../src/routes";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";

export const MyContext = createContext();

<router />;

function App() {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });

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

  const fetchCategories = async () => {
    try {
      const res = await fetchDataFromApi("/api/category/");
      if (Array.isArray(res?.data)) {
        setCatData(res.data);
        // console.log(res.data)
      } else {
        setCatData([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshToggle]);

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
    setAddress,
    catData,
    setCatData,
    refreshToggle,
    setRefreshToggle,
    fetchCategories,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
      </MyContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
