import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from "./editSubCatBox";

const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(0);

  const context = useContext(MyContext);

  useEffect(() => {
    if (!context?.isOpenFullScreenPanel?.open) {
      context.setRefreshToggle((prev) => !prev);
    }
  }, [context?.isOpenFullScreenPanel?.open]);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 pb-0 w-full ">
        <h2 className="text-[18px] font-[600]">
          Sub Category List
          <span className="text-[14px] font-[400]"> (Material UI Table)</span>
        </h2>
        <div className="col2 w-[30%] ml-auto flex items-center gap-3 justify-end">
          <Button className="btn btn-sm !bg-green-600 !text-white">
            Export
          </Button>
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
          >
            Add Sub Category
          </Button>
        </div>
      </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5 px-5 pb-5">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLevelCat, index) => {
              return (
                <li className="w-full mb-1" key={index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                    <span className="font-[500] flex items-center gap-4 text-[14px]">
                      {firstLevelCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>
                  {isOpen === index && (
                    <>
                      {firstLevelCat?.children?.length !== 0 && (
                        <ul className="w-full">
                          {firstLevelCat?.children?.map(
                            (subCat, subCatIndex) => {
                              return (
                                <li className="w-full py-1" key={subCatIndex}>
                                  <EditSubCatBox
                                    name={subCat?.name}
                                    id={subCat?._id}
                                    index={subCatIndex}
                                    catData={context?.catData}
                                    selectedCatId={subCat?.parentId}
                                    selectedCatName={subCat?.parentCatName}
                                  />
                                  {subCat?.children?.length !== 0 && (
                                    <ul className="pl-4">
                                      {subCat?.children?.map(
                                        (thirdLevel, thirdLevelIndex) => {
                                          return (
                                            <li
                                              key={thirdLevelIndex}
                                              className="w-full hover:bg-[#f1f1f1]"
                                            >
                                              <EditSubCatBox
                                                name={thirdLevel?.name}
                                                catData={
                                                  firstLevelCat?.children
                                                }
                                                index={thirdLevelIndex}
                                                selectedCatId={
                                                  thirdLevel?.parentId
                                                }
                                                selectedCatName={
                                                  thirdLevel?.parentCatName
                                                }
                                                id={thirdLevel?._id}
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
