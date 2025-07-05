import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CategoryPanel from "./categoryPanel";
import "../navigation/style.css";
import { MyContext } from "../../../App";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  const context = useContext(MyContext);

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
              {context?.catData?.length > 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <li key={index} className="list-none relative">
                      <Link
                        to={"/"}
                        className="link transition font-semibold text-[16px]"
                      >
                        <Button
                          className="link transition !font-semibold !text-[rgba(0,0,0,0.8)]
                  hover:!text-[#f03170] !py-4"
                        >
                          {item?.name}
                        </Button>
                      </Link>

                      {item?.children?.length > 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {item?.children?.map((subCat, subCatIndex) => {
                              return (
                                <li
                                  key={subCatIndex}
                                  className="list-none w-full relative"
                                >
                                  <Link to={"/"} className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>

                                    {subCat?.children?.length > 0 && (
                                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                        <ul>
                                          {subCat?.children?.map(
                                            (thirdCat, thirdIndex) => {
                                              return (
                                                <Link
                                                  to={"/"}
                                                  className="w-full"
                                                >
                                                  <li key={thirdIndex} className="list-none w-full">
                                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                      {thirdCat?.name}
                                                    </Button>
                                                  </li>
                                                </Link>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </nav>
      {
        context?.catData?.length > 0 &&
        <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
        data={context?.catData}
      />
      }
      
    </>
  );
};

export default Navigation;
