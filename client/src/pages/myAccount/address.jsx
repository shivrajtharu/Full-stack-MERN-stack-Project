import { useContext, useEffect, useState } from "react";
import AccountSideBar from "../../components/accountSideBar";
import { MyContext } from "../../App";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import Radio from "@mui/material/Radio";
import { FaRegTrashAlt } from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Address = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [address, setAddress] = useState([]);

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

  const handleChangeStatus = (event) => {
    const value = event.target.value === "true";
    setStatus(value);
    setFormFields((prevFields) => ({
      ...prevFields,
      status: value,
    }));
  };

  const handleClose = () => {
    setIsOpenModel(false);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      return {
        ...prevFields,
        [name]: value,
      };
    });
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (context?.userData?._id && context?.userData?._id !== "false") {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
        setAddress(res.address);
      });
    }
  }, [context?.userData?._id]);

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
      userId: context?.user?._id || context?.userData?._id || formFields.userId,
    };

    postData("/api/address/add", payload)
      .then((res) => {
        setIsLoading(false);

        if (res?.error !== true) {
          context.notify(
            res.message || "Address Added successfully!",
            "success"
          );

          setIsOpenModel(false); // Close the dialog after successful submission

          context?.setIsOpenFullScreenPanel &&
            context.setIsOpenFullScreenPanel({
              open: false,
            });

          fetchDataFromApi(
            `/api/address/get?userId=${
              context?.user?._id || context?.userData?._id
            }`
          ).then((res) => {
            setAddress(res.address);
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
      });
  };

  const removeAddress = (id) => {
    deleteData(`/api/address/delete/${id}`).then((res) => {
      console.log(res);
      if (!res.error) {
        context.notify("Address deleted successfully", "success");

        // Refresh address list
        fetchDataFromApi(
          `/api/address/get?userId=${
            context?.user?._id || context?.userData?._id
          }`
        ).then((res) => {
          setAddress(res.address);
        });
      } else {
        context.notify(res.message || "Failed to delete address", "error");
      }
    });
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-[50%]">
            <div className="card bg-white shadow-md rounded-md p-5 mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Address</h2>
              </div>

              <hr />

              <div
                className="flex items-center justify-center hover:bg-[#e7f3f9] rounded-md  p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer"
                onClick={() => setIsOpenModel(true)}
              >
                <span className="text-[14px] font-[500]"> Add Address</span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <div
                        key={address?._id || index}
                        className="addressBox group w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer  border border-dashed border-[rgba(0,0,0,0.2)] relative"
                      >
                        <label className="mr-auto">
                          <Radio
                            {...label}
                            name="address"
                            checked={selectedValue === address?._id}
                            value={address?._id}
                            onChange={handleChange}
                          />
                          <span className="text-[12px]">
                            {address?.address_line1 +
                              " " +
                              address?.city +
                              " " +
                              address?.country +
                              " " +
                              address?.provision +
                              " " +
                              address?.pincode}
                          </span>
                        </label>

                        <span
                          onClick={() => removeAddress(address?._id)}
                          className="hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto z-50"
                        >
                          <FaRegTrashAlt />
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle>Add Address</DialogTitle>
        <form className="p-8 py-3 pb-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Provision"
                variant="outlined"
                size="small"
                name="provision"
                onChange={onChangeInput}
                value={formFields.provision}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <PhoneInput
                defaultCountry="np"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prevFields) => ({
                    ...prevFields,
                    mobile: phone,
                  }));
                }}
                disabled={isLoading === true ? true : false}
              />
            </div>

            <div className="col w-[50%]">
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

          <div className="flex items-center justify-between w-full gap-5">
            <Button type="submit" className="btn-org btn-lg w-full">
              Save
            </Button>

            <Button
              className="btn-org btn-lg btn-border w-full"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
