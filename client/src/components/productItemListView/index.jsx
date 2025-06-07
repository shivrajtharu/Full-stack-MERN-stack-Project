import { Link } from "react-router-dom";
import "../productItem/style.css";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { MyContext } from "../../App";

const ProductItemListView = () => {
    const context = useContext(MyContext)
  return (
    <>
      <div className="productItem rounded-md h-[255px] shadow-md overflow-hidden border border-1 border-[rgba(0,0,0,0.1)] flex items-center">
        <div className=" group imgWrapper w-[25%] h-full  overflow-hidden relative">
          <Link to="/productDetails/:id">
            <div className="img h-[260px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734529918447_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-0-202410111253.webp"
                className="w-full"
              />
              <img
                src="https://api.spicezgold.com/download/file_1734529918450_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-1-202410111253.webp"
                className="w-full transition-all duration-850 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </div>
          </Link>
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[13px] font-[500]">
            -10%
          </span>

          <div
            className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0
          group-hover:opacity-100"
          >
            <Button className=" !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary group" onClick={() => context.setOpenProdutctDetailsModal(true)}>
              <MdZoomOutMap className="text-[18px] !text-black" />
            </Button>

            <Button className=" !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary group">
              <IoGitCompareOutline className="text-[18px] !text-black" />
            </Button>

            <Button className=" !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary group">
              <FaRegHeart className="text-[18px] !text-black" />
            </Button>
          </div>
        </div>
        <div className="info p-3 px-8 py-5 bg-[#f1f1f1] w-[75%] h-full">
          <h6 className="text-[15px] !font-[400]">
            <Link to="/" className="link transition-all">
              Soylent Green
            </Link>
          </h6>
          <h3 className=" title text-[18px] mt-3 mb-3 font-[500] text-[#000]">
            <Link to={"/"} className="link transition-all">
              Buy New Trend Women Black Cotton Blend Top
            </Link>
          </h3> 
          <p className="text-[14px] text-gray-600 mb-3">
            This stylish black cotton blend top is perfect for casual outings or semi-formal events. Its comfortable fabric and trendy design make it a must-have in your wardrobe.
            </p>

          <Rating name="size-small" defaultValue={2} size="small" readOnly />
          <div className="flex items-center gap-4">
            <span className="old price line-through text-gray-500 text-[15px] font-[500]">
              $58.00
            </span>
            <span className="old price text-primary text-[15px] font-semibold">
              $58.00
            </span>
          </div>
            <div>
               <Button className="btn-org !mt-3 flex gap-2"><MdOutlineShoppingCart className="text-[20px]" /> Add to Cart</Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductItemListView ;
