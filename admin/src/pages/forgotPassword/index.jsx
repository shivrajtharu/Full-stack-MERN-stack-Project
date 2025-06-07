import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";

const ForgotPassword = () => {
 
  return (
    <>
      <section className="bg-white w-full min-h-screen">
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
            Having trouble to sign in?
            <br />
            Reset Your Password
          </h1>

          <br />

          <form className="w-full px-8 mt-3">
            <div className="form-group w-full mb-4">
              <h4 className="text-[14px] font-[500] mb-1">Email</h4>
              <input
                placeholder="Enter your email"
                type="email"
                className="w-full h-[50px] border-2 border-[(rgba(0,0,0,0.1))] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              ></input>
            </div>

            <Link to={'/verify-account'} className="w-full">
              <Button className="btn-blue btn-lg w-full">Reset Password</Button>
            </Link>

            <div className="text-center mt-4 flex items-center justify-center gap-2">
              <span>Dont't want to reset?</span>
              <Link
                to={"/forgot-password"}
                className="text-primary text-[15px] font-[700] hover:underline hover:text-gray-700"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
