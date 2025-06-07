import { Button, CircularProgress } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MyContext } from "../../App";
import { postData } from "../../../../client/src/utils/api";

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  const [loadingFb, setLoadingFb] = useState(false);
  function handleClickFb() {
    setLoadingFb(true);
  }

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const[formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
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

    if (formFields.name === "") {
      context.notify("Please Enter Your full Name", "error");
      setIsLoading(false);
      return false;
    }

    if (formFields.email === "") {
      context.notify("Please Enter Your Email Id", "error");
      setIsLoading(false);
      return false;
    }

    if (formFields.password === "") {
      context.notify("Please Enter Your Password", "error");
      setIsLoading(false);
      return false;
    }

    postData("/api/user/register", formFields)
      .then((res) => {
        setIsLoading(false);
        if (res.error !== true) {
          context.notify(res?.message || "Registration successful!", "success");
          localStorage.setItem("userEmail", formFields.email);
          localStorage.setItem("verifySource", "register");
          setFormFields({
            name: "",
            email: "",
            password: "",
          });
          navigate("/verify");
        } else {
          context.notify(res?.message || "Registration failed", "error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        context.notify("An error occurred. Please try again.", "error");
      });
  };

  return (
    <>
      <section className="bg-white w-full ">
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
            Join Us Today! Get Special <br /> benefits and stay up-to-date.
          </h1>

          <div className="flex items-center justify-center w-full mt-5 gap-3">
            <Button
              size="small"
              onClick={handleClickGoogle}
              endIcon={<FcGoogle />}
              loading={loadingGoogle}
              loadingPosition="end"
              variant="outlined"
              className="!bg-none !text-[15px] !py-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
            >
              SignIn with Google
            </Button>
            <Button
              size="small"
              onClick={handleClickFb}
              endIcon={<BsFacebook />}
              loading={loadingFb}
              loadingPosition="end"
              variant="outlined"
              className="!bg-none !text-[15px] !py-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
            >
              SignIn with Facebook
            </Button>
          </div>

          <br />
          <div className="w-full flex items-center justify-center gap-3">
            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
            <span className="text-[14px] font-[500]">
              Or, Sign in with your email
            </span>
            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          </div>

          <br />

          <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-4">
              <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
              <input
                type="text"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full h-[50px] border-2 border-[(rgba(0,0,0,0.1))] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              ></input>
            </div>

            <div className="form-group w-full mb-4">
              <h4 className="text-[14px] font-[500] mb-1">email</h4>
              <input
                type="email"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full h-[50px] border-2 border-[(rgba(0,0,0,0.1))] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              ></input>
            </div>

            <div className="form-group w-full mb-4">
              <h4 className="text-[14px] font-[500] mb-1">Password</h4>
              <div className="w-full relative">
                <input
                  type={isPasswordShow === false ? "password" : "text"}
                  name="password"
                  value={formFields.password}
                  disabled={isLoading === true ? true : false}
                  onChange={onChangeInput}
                  className="w-full h-[50px] border-2 border-[(rgba(0,0,0,0.1))] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                />

                <Button
                  className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
              !h-[35px] !min-w-[35px] !text-gray-600"
                  onClick={() => setIsPasswordShow(!isPasswordShow)}
                >
                  {isPasswordShow === true ? (
                    <FaEyeSlash className="text-[18px]" />
                  ) : (
                    <FaRegEye className="text-[18px]" />
                  )}
                </Button>
              </div>
            </div>

            <div className="form-group w-full mb-4 flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />

              <Link
                to={"/login"}
                className="text-primary text-[15px] font-[700] hover:underline hover:text-gray-700"
              >
                Already have an account
              </Link>
            </div>

            <Button
              className="btn-blue btn-lg w-full"
              type="submit"
              disabled={isLoading === true ? true : false}
            >
              {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
