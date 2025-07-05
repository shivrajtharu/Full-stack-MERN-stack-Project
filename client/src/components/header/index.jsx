import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Search from "../search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./navigation";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { fetchDataFromApi } from "../../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);

    try {
      const token = localStorage.getItem("accessToken");
      // Ensure token exists before calling API
      if (token) {
        const res = await fetchDataFromApi(`/api/user/logout?token=${token}`);
        if (!res?.error) {
          context.setIsLogin(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate('/');
        } else {
          // fallback: clear tokens and update state even if API fails
          context.setIsLogin(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate('/');
        }
      } else {
        // No token, just clear state and redirect
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate('/');
      }
    } catch (error) {
      // fallback: clear tokens and update state on error
      context.setIsLogin(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate('/');
    }
  };

  const { userData } = context;

  return (
    <header className="bg-white sticky -top-[150px] z-50">
      <div className="top-strip mt-1 py-2 border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[13px] font-[500]">
                Get up to 50% off new season styles, limited time
              </p>
            </div>
            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="link text-[13px] font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="link text-[13px] font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 py-3 w-[25%]">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-[150px] h-auto" />
            </Link>
          </div>
          <div className="col2 w-[40%]">
            <Search />
          </div>
          <div className="col3 w-[35%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-3 w-full">
              {context.isLogin === false ? (
                <li className="list-none">
                  <Link
                    to={"/login"}
                    className="link transition text-[15px] font-semibold "
                  >
                    Login
                  </Link>
                  &nbsp;|&nbsp;
                  <Link
                    to={"/register"}
                    className="link transition text-[15px] font-semibold "
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button
                    className="myAccountWrap !text-[rgba(0,0,0,0.8)] flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <span className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] flex items-center justify-center">
                      <FaRegUser className="font-[16px] text-[rgba(0,0,0,0.7)]" />
                    </span>
                    <div className="info flex flex-col">
                      <h4 className=" leading-3 text-[14px] text-[rgba(0,0,0,0.6)] capitalize text-left justify-start">
                        {userData?.name}
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.6)] capitalize text-left justify-start">
                        {userData?.email}
                      </span>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to={"/my-account"} className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-3"
                      >
                        <FaRegUser className="text-[16px]" />{" "}
                        <span className="text-[14px]">My Account</span>
                      </MenuItem>
                    </Link>

                    <Link to={"/my-orders"} className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-3"
                      >
                        <IoBagCheckOutline className="text-[18px]" />{" "}
                        <span className="text-[14px]">Orders</span>
                      </MenuItem>
                    </Link>

                    <Link to={"/my-list"} className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-3"
                      >
                        <FaRegHeart className="text-[18px]" />
                        <span className="text-[14px]">My List</span>
                      </MenuItem>
                    </Link>

                    <MenuItem
                      onClick={handleLogout}
                      className="flex gap-2 !py-3"
                    >
                      <IoIosLogOut className="text-[18px]" />
                      <span className="text-[14px]">Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}
              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="primary">
                      <IoGitCompareOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <StyledBadge badgeContent={4} color="primary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge badgeContent={4} color="primary">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
