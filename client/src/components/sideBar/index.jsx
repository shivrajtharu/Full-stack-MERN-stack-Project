import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../sideBar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from "@mui/material/Rating";

const SideBar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
    const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] = useState(true);
    const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);

  return (
    <div>
      <aside className="sideBar py-5">
        <div className="box">
          <h3 className="mb-3 text-[16px] font-bold flex items-center pr-5 w-full">
            Shop By Category
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !ml-auto !rounded-full !text-[#000] " onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
              {
                isOpenCategoryFilter ? <FaAngleUp/> : <FaAngleDown />
              }
            </Button>
          </h3>
          <Collapse isOpened={isOpenCategoryFilter}>
            <div className="scroll px-4 relative -left-13px">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Fashion"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Electronics"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Bags"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Footwear"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Groceries"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Beauty"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Wellness"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Jwellery"
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        <div className="box mt-3">
          <h3 className="mb-3 text-[16px] font-bold flex items-center pr-5 w-full">
            Availablility
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !ml-auto !rounded-full !text-[#000] " onClick={() => setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)}>
              {
                isOpenAvailabilityFilter ? <FaAngleUp/> : <FaAngleDown />
              }
            </Button>
          </h3>
          <Collapse isOpened={isOpenAvailabilityFilter}>
            <div className="scroll px-4 relative -left-13px">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Available (17)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Instock (10)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Not Available (1)"
                className="w-full"
              />
              
            </div>
          </Collapse>
        </div>

        <div className="box mt-4">
          <h3 className="mb-3 text-[16px] font-bold flex items-center pr-5 w-full">
            Size
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !ml-auto !rounded-full !text-[#000] " onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}>
              {
                isOpenSizeFilter ? <FaAngleUp/> : <FaAngleDown />
              }
            </Button>
          </h3>
          <Collapse isOpened={isOpenSizeFilter}>
            <div className="scroll px-4 relative -left-13px">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Small (6)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Medium (5)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Large (7)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="XL (1)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="XXL (3)"
                className="w-full"
              />
              
            </div>
          </Collapse>
        </div>
        <div className="box mt-4">
          <h3 className="mb-3 text-[16px] font-bold flex items-center pr-5 w-full">
            Filter By Price
          </h3>

          <RangeSlider />
          <div className="flex pt-4 pb-2 priceRange">
            <span className="text-[13px]">From: <strong className="text-dark">Rs: {100}</strong></span>
            <span className="ml-auto text-[13px]">From: <strong className="text-dark">Rs: {5000}</strong></span>
          </div>

        </div>
        <div className="box mt-4">
          <h3 className="mb-3 text-[16px] font-bold flex items-center pr-5 w-full">
            Filter By Rating
          </h3>
              <div className="w-full">
                <Rating name="size-small" defaultValue={5} size="small" readOnly />
              </div>
              <div className="w-full">
                <Rating name="size-small" defaultValue={4} size="small" readOnly />
              </div>
              <div className="w-full">
                <Rating name="size-small" defaultValue={3} size="small" readOnly />
              </div>
              <div className="w-full">
                <Rating name="size-small" defaultValue={2} size="small" readOnly />
              </div>
              <div className="w-full">
                <Rating name="size-small" defaultValue={1} size="small" readOnly />
              </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
