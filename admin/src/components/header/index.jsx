import Button from "@mui/material/Button";
import { FaRegBell } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { MyContext } from "../../App";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);

  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);
   const navigate = useNavigate()

   const { userData } = context;

   const handleLogout = async () => {
      setAnchorMyAcc(null);
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


  return (
    <>
      <header
        className={`w-full h-[auto] py-2 ${
          context.isSideBarOpen === true ? "pl-64" : "pl-5"
        } bg-[#fff] flex items-center justify-between pr-7 shadow-md border-b] transition-all`}
      >
        <div className="part1">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)]"
            onClick={() => context.setIsSideBarOpen(!context.isSideBarOpen)}
          >
            {context.isSideBarOpen === true ? (
              <AiOutlineMenuFold className="text-[20px] text-[rgba(0,0,0,0.8)]" />
            ) : (
              <AiOutlineMenuUnfold className="text-[20px] text-[rgba(0,0,0,0.8)]" />
            )}
          </Button>
        </div>

        <div className="part2 w-[40%] flex items-center justify-end gap-5">
          <IconButton aria-label="Bell">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>

            {
              context.isLogin === true ?
              <div className="relative">
            <div
              className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer"
              onClick={handleClickMyAcc}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s"
                className="w-full h-full"
              />
            </div>

            <Menu
              anchorEl={anchorMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
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
              <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">
                      {userData?.name}
                    </h3>
                    <p className="text-[12px] font-[400] opacity-70">
                      {userData?.email}

                    </p>
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <Link to={'/profile'}>
                <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-3"
              >
                <FaRegUser /> <span className="text-[14px]">Profile</span>
              </MenuItem>
              </Link>
              <MenuItem
                onClick={handleLogout}
                className="flex items-center gap-3"
              >
                <IoLogOutOutline className="text-[20px]" />{" "}
                <span className="text-[14px]">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
              :

              <Link to={'/login'}><Button className="btn-blue btn-sm !rounded-full">Sign In</Button></Link>

            }

        </div>
      </header>
    </>
  );
};

export default Header;
