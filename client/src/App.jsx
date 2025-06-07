import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import ProductListing from "./pages/productListing";
import Footer from "./components/footer";
import ProductDetails from "./pages/productDetails";
import { createContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/productZoom";
import ProductDetailsComponent from "./components/productDetails";
import Login from "./pages/login";
import Register from "./pages/register";
import CartPage from "./pages/cartPage";
import Verify from "./pages/verify";

import toast, { Toaster } from "react-hot-toast";
import Checkout from "./pages/checkOut";
import MyAccount from "./pages/myAccount";
import MyList from "./pages/myList";
import Orders from "./pages/orders";
import { fetchDataFromApi } from "./utils/api";
import ResetPassword from "./pages/ResetPassword";
import Address from "./pages/myAccount/address";

export const MyContext = createContext();

function App() {
  const [openProdutctDetailsModal, setOpenProdutctDetailsModal] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        notify('Failed to fetch user details. Please login again.', 'error');
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


  const handleCloseProductDetailsModal = () => setOpenProdutctDetailsModal(false);
  const toggleCartPannel = (newOpen) => () => setOpenCartPanel(newOpen);

  const values = {
    setOpenProdutctDetailsModal,
    setOpenCartPanel,
    toggleCartPannel,
    openCartPanel,
    notify,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <BrowserRouter>
          <Header />
          {isLogin && userData === null ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/productListing" exact element={<ProductListing />} />
                <Route path="/productDetails/:id" exact element={<ProductDetails />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/cart" exact element={<CartPage />} />
                <Route path="/verify" exact element={<Verify />} />
                <Route path="/reset-password" exact element={<ResetPassword />} />
                <Route path="/checkout" exact element={<Checkout />} />
                <Route path="/my-account" exact element={<MyAccount />} />
                <Route path="/my-list" exact element={<MyList />} />
                <Route path="/my-orders" exact element={<Orders />} />
                <Route path="/address" exact element={<Address />} />
              </Routes>
              <Footer />
            </>
          )}
        </BrowserRouter>
      </MyContext.Provider>

      <Toaster />

      <Dialog
        open={openProdutctDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>
            <div className="col2 productContent py-7 px-8 pr-16">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
