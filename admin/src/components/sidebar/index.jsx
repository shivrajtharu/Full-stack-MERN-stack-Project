import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { useContext, useState } from "react";
import { MyContext } from "../../App";

const SideBar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);

  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const context = useContext(MyContext);

  return (
    <>
      <div
        className={`sideBar fixed top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 w-[${
          context.isSideBarOpen === true ? "18%" : "0px"
        }]`}
      >
        <div className="py-2 w-full">
          <Link to={"/"}>
            <img src="/logo.png" className="w-[120px]" />
          </Link>
        </div>

        <ul className="mt-4">
          <li>
            <Link to="/">
              <Button className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]">
                <RxDashboard className="text-[18px]" /> <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(1)}
            >
              <FaRegImage className="text-[18px]" /> <span>Home Slides</span>
              <span className="flex items-center justify-center ml-auto w-[30px] h-[30px]">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="homeSlider/list">
                    <Button className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Home Banners List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
              <Button className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]">
                <FiUsers className="text-[18px]" /> <span>Users</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(3)}
            >
              <RiProductHuntLine className="text-[18px]" />{" "}
              <span>Products</span>
              <span className="flex items-center justify-center ml-auto w-[30px] h-[30px]">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product Upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(4)}
            >
              <TbCategory className="text-[18px]" /> <span>Category</span>
              <span className="flex items-center justify-center ml-auto w-[30px] h-[30px]">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subCategory/list">
                    <Button className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Sub Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!w-full !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Sub Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]">
                <IoBagCheckOutline className="text-[20px]" />{" "}
                <span>Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <Button className="!w-full !justify-start !capitalize gap-3 !text-[14px] !text-[rgba(0,0,0,0.7)] !font-semibold items-center !py-2 hover:!bg-[#f1f1f1]">
                <IoLogOutOutline className="text-[22px]" /> <span>Logout</span>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
