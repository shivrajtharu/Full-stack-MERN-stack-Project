import { Link } from "react-router-dom";
import "../productItem/style.css";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../App";
const ProductItem = () => {
    const context = useContext(MyContext)
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

  return (
    <>
      <div className="productItem rounded-md shadow-md overflow-hidden border border-1 border-[rgba(0,0,0,0.1)] ">
        <div className=" group imgWrapper w-[100%]  overflow-hidden relative">
          <Link to="/productDetails/:id">
            <div className="img h-[220px] overflow-hidden">
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
        <div className="info p-3 py-5 bg-[#f1f1f1]">
          <h6 className="text-[13px] !font-[400]">
            <Link to="/" className="link transition-all">
              Soylent Green
            </Link>
          </h6>
          <h3 className=" title text-[13px] mt-1 mb-1 font-[500] text-[#000]">
            <Link to={"/"} className="link transition-all">
              Buy New Trend Women Black Cotton Blend Top
            </Link>
          </h3>
          <Rating name="size-small" defaultValue={2} size="small" readOnly />
          <div className="flex items-center gap-4">
            <span className="old price line-through text-gray-500 text-[15px] font-[500]">
              $58.00
            </span>
            <span className="old price text-primary text-[15px] font-semibold">
              $58.00
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
