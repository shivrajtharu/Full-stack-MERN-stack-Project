import { Button } from "@mui/material";
import { FiMinusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useState } from "react";

const CategoryCollapse = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          {props?.data?.length > 0 &&
            props?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-none flex items-center relative flex-col"
                >
                  <Link to="/" className="w-full">
                    <Button className="!w-full !text-left !justify-start !px-3 !font-semibold !text-[rgba(0,0,0,0.8)] ">
                      {item?.name}
                    </Button>
                  </Link>

                  {submenuIndex === index ? (
                    <FiMinusSquare
                      className="absolute top-[10px] right-[20px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[20px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  )}

                  {submenuIndex === index && (
                    <ul className="submenu w-full pl-3">
                      {item?.children?.length > 0 &&
                        item?.children?.map((subCat, subCatIndex) => {
                          return (
                            <li
                              key={subCatIndex}
                              className="list-none relative"
                            >
                              <Link to="/" className="w-full">
                                <Button className="w-full !text-left !justify-start !px-3 !font-[500] !text-[rgba(0,0,0,0.8)] ">
                                  {subCat?.name}
                                </Button>
                              </Link>

                              {innerSubmenuIndex === subCatIndex ? (
                                <FiMinusSquare
                                  className="absolute top-[10px] right-[20px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(subCatIndex)}
                                />
                              ) : (
                                <FaRegSquarePlus
                                  className="absolute top-[10px] right-[20px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(subCatIndex)}
                                />
                              )}

                              {innerSubmenuIndex === subCatIndex && (
                                <ul className="inner_submenu w-full pl-3">
                                  {subCat?.children?.length > 0 &&
                                    subCat?.children?.map(
                                      (thirdCat, thirdCatIndex) => {
                                        return (
                                          <li
                                            key={thirdCatIndex}
                                            className="list-none relative mb-1"
                                          >
                                            <Link
                                              to="/"
                                              className="link w-full !text-left !justify-start !px-3 transition text-[13px]"
                                            >
                                              {thirdCat?.name}
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
