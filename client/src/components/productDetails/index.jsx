import QtyBox from "../../components/qtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { useState } from "react";

const ProductDetailsComponent = (props) => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [productActionSizeIndex, setProductActionSizeIndex] = useState(null);

  return (
    <>
      <h1 className="text-[24px] font-[600] mb-2">{props?.item?.name}</h1>
      <div className="flex items-center gap-3 text-[14px]">
        <span className="text-gray-400">
          Brands :
          <span className="font-[500] text-black opacity-75">
            {props?.item?.brand}
          </span>
        </span>
        <Rating
          name="size-small"
          value={props?.item?.rating}
          size="small"
          readOnly
        />
        <span className="text-[13px] cursor-pointer"> Review (5)</span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="old price line-through text-gray-500 text-[20px] font-[500]">
          &#8377;{props?.item?.oldPrice}
        </span>
        <span className="price text-primary text-[20px] font-semibold">
          &#8377;{props?.item?.price}
        </span>
        <span className="text-[14px]">
          Available In Stock: &nbsp;
          <span className="text-green-600 text-[14px] font-bold">
            {props?.item?.countInStock} Items
          </span>
        </span>
      </div>

      <p className="mt-3 pr-10 mb-5">{props?.item?.description}</p>

      <div className="pb-2">
        {props?.item?.productRam?.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[16px]"> RAM:</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.productRam?.map((ram, ramIndex) => {
              return (
                <Button key={ramIndex}
                  className={`${
                    productActionIndex === ramIndex ? "!bg-primary !text-white" : ""
                  }`}
                  onClick={() => setProductActionIndex(ramIndex)}
                >
                  {ram}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      </div>
      
      {props?.item?.size?.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[16px]"> Size:</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.size?.map((size, sizeIndex) => {
              return (
                <Button key={sizeIndex}
                  className={`${
                    productActionSizeIndex === sizeIndex ? "!bg-primary !text-white" : ""
                  }`}
                  onClick={() => setProductActionSizeIndex(sizeIndex)}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>
      <div className="flex items-centre gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox />
        </div>

        <Button className="btn-org flex gap-2">
          <MdOutlineShoppingCart className="text-[20px]" />
          Add to Cart
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 link cursor-pointer text-[15px] font-[500]">
          <FaRegHeart className="text-[18px]" /> Add to WhishList
        </span>

        <span className="flex items-center gap-2 link cursor-pointer text-[15px] font-[500]">
          <IoGitCompareOutline className="text-[18px]" /> Add to Compare
        </span>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
