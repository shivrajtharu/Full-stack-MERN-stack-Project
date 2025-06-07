import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
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

    postData("/api/user/register", formFields).then((res) => {
      setIsLoading(false);
      if (res.error !== true) {
        context.notify( res?.message || "Registration successful!", "success");
        localStorage.setItem("userEmail", formFields.email);
        localStorage.setItem("verifySource", "register");
        setFormFields({
          name: "",
          email: "",
          password: "",
        });
        navigate('/verify')
      } else {
        context.notify(res?.message || "Registration failed", "error");
      }
    }).catch((err) => {
      setIsLoading(false);
      context.notify("An error occurred. Please try again.", "error");
    });
  };

  return (
    <>
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-black text-[18px]">
              Register with a new account
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5">
                <TextField
                  type="text"
                  name="name"
                  value={formFields.name}
                  disabled={isLoading === true ? true : false}
                  id="name"
                  label="Full Name"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group w-full mb-5">
                <TextField
                  type="email"
                  name="email"
                  value={formFields.email}
                  disabled={isLoading === true ? true : false}
                  id="email"
                  label="Email Id"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group w-full mb-5 relative">
                <TextField
                  type={isShowPassword === false ? "password" : "text"}
                  id="password"
                  name="password"
                  value={formFields.password}
                  disabled={isLoading === true ? true : false}
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
                <Button
                  type="button"
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === false ? (
                    <IoMdEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>

              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={isLoading === true ? true : false}
                  className="btn-org btn-lg w-full flex gap-3"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>

              <p className="text-center">
                Already have an account
                <Link
                  to="/login"
                  className="link text-[14px] font-[600] ml-1 text-primary"
                >
                  Login
                </Link>
              </p>

              <p className="text-center font-[500]">
                Or Continue with social account
              </p>

              <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
                <FcGoogle className="text-[22px]" />
                Register with Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
