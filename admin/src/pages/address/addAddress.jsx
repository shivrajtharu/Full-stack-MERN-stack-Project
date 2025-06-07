import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const [status, setStatus] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    provision: "",
    pincode: "",
    country: "",
    mobile: "",
    status: status,
    selected: false,
    userId: context?.user?._id || "",
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

  const handleChangeStatus = (event) => {
    const value = event.target.value === "true";
    setStatus(value);
    setFormFields((prevFields) => ({
      ...prevFields,
      status: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation checks
    if (!formFields.address_line1) {
      context.notify("Please Enter Address Line 1", "error");
      setIsLoading(false);
      return;
    }

    if (!formFields.city) {
      context.notify("Please Enter your city name", "error");
      setIsLoading(false);
      return;
    }

    if (!formFields.provision) {
      context.notify("Please Enter Your provision", "error");
      setIsLoading(false);
      return;
    }
    if (!formFields.pincode) {
      context.notify("Please Enter pincode", "error");
      setIsLoading(false);
      return;
    }
    if (!formFields.country) {
      context.notify("Please Enter Your Country", "error");
      setIsLoading(false);
      return;
    }
    if (!formFields.mobile || formFields.mobile.length < 10) {
      context.notify("Please Enter Your 10 digit mobile Number", "error");
      setIsLoading(false);
      return;
    }
    // Ensure userId is set before submitting
    const payload = {
      ...formFields,
      userId: context?.user?._id || formFields.userId,
    };

    postData("/api/address/add", payload)
      .then((res) => {
        setIsLoading(false);

        if (res?.error !== true) {
          context.notify(
            res.message || "Address Added successfully!",
            "success"
          );

          context?.setIsOpenFullScreenPanel({
            open: false,
          });

          fetchDataFromApi(
            `/api/address/get?userId=${context?.userData?._id}`
          ).then((res) => {
            context?.setAddress(res.address);
          });
        } else {
          context.notify(
            res?.message || "Failed to Add Address. Please try again.",
            "error"
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        context.notify("An error occurred. Please try again.", "error");
      });
  };

  return (
    <>
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 pb-3 gap-5">
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Address Line 1
            </h3>
            <input
              type="text"
              name="address_line1"
              onChange={onChangeInput}
              value={formFields.address_line1}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
            ></input>
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">City</h3>
            <input
              name="city"
              onChange={onChangeInput}
              value={formFields.city}
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
            ></input>
          </div>
        </div>

        <div className="grid grid-cols-3 pb-3 gap-5">
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Provision
            </h3>
            <input
              type="text"
              name="provision"
              onChange={onChangeInput}
              value={formFields.provision}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
            ></input>
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">Pincode</h3>
            <input
              type="text"
              name="pincode"
              onChange={onChangeInput}
              value={formFields.pincode}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
            ></input>
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">Country</h3>
            <input
              type="text"
              name="country"
              onChange={onChangeInput}
              value={formFields.country}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
            ></input>
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Mobile No
            </h3>
            <PhoneInput
              name="mobile"
              defaultCountry="np"
              value={phone}
              onChange={(phone) => {
                setPhone(phone);
                setFormFields((prevFields) => ({
                  ...prevFields,
                  mobile: phone,
                }));
              }}
              className="w-full"
            />
            <h3 className="text-[14px] text-black font-[500] mb-1 mt-3">
              Status
            </h3>
            <Select
              value={status ? "true" : "false"}
              onChange={handleChangeStatus}
              size="small"
              className="w-full"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </div>
        </div>
        <br />

        <br />
        <Button
          type="submit"
          disabled={isLoading === true ? true : false}
          className="btn-blue btn-lg w-full flex gap-2"
        >
          {isLoading === true ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            "Add Address"
          )}
        </Button>
      </form>
    </>
  );
};
export default AddAddress;
