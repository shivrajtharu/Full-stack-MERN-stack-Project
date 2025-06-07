import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useState } from "react";
import CategoryPanel from "./categoryPanel";
import "../navigation/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-start gap-8">
          <div className="col_1 w-[20%] mr-4">
            <Button
              className="!text-black gap-2 !font-semibold w-full text-[16px]"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[18px] ml-auto font-bold cursor-pointer" />
            </Button>
          </div>
          <div className="col_2 w-[65%]">
            <ul className="flex items-centre gap-4 nav">
              <li className="list-none">
                <Link
                  to="/"
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                   hover:!text-[#f03170] !py-4"
                  >
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                  hover:!text-[#f03170] !py-4"
                  >
                    Fashion
                  </Button>
                </Link>

                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to={"/"} className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Man
                        </Button>

                        <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            <Link to={"/"} className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  T-Shirt
                                </Button>
                              </li>
                            </Link>

                            <Link to={"/"} className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Jeans
                                </Button>
                              </li>
                            </Link>

                            <Link to={"/"} className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Footwear
                                </Button>
                              </li>
                            </Link>

                            <Link to={"/"} className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Watch
                                </Button>
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={"/"} className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Women
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={"/"} className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Kids
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={"/"} className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Girls
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={"/"} className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Boys
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                  hover:!text-[#f03170] !py-4"
                  >
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                   hover:!text-[#f03170] !py-4"
                  >
                    Bags
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                   hover:!text-[#f03170] !py-4"
                  >
                    Footwear
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                  hover:!text-[#f03170] !py-4"
                  >
                    Groceries
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                  hover:!text-[#f03170] !py-4"
                  >
                    Beauty
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                   hover:!text-[#f03170] !py-4"
                  >
                    Wellness
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition font-semibold text-[16px]"
                >
                  <Button
                    className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                   hover:!text-[#f03170] !py-4"
                  >
                    Jwellery
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
