import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

const MyListItems = () => {

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
        <div className="img w-[15%] rounded-md overflow-hidden">
          <Link to={"/productDetails/:id"} className="group">
            <img
              src="https://api.spicezgold.com/download/file_1734527564399_fytona-medium-laptop-backpack-light-weight-for-school-collage-office-tuition-and-picnic-waterproof-backpack-grey-25-l-product-images-rvyoumccae-0-202402141853.jpg"
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info w-[85%] relative">
          <IoCloseSharp className="cursor-pointer absolute top-0 right-0 text-[20px] link transition-all" />
          <span className="text-[13px]">Fytona</span>
          <h3 className="text-[15px] pr-8">
            <Link to={"/productDetails/3435"} className="link">
              Fytona Medium Laptop Backpack | Light weight For School Collage
              Office Tuition and Picnic | Waterproof Backpack (Grey, 25 L)
            </Link>
          </h3>

          <Rating name="size-small" defaultValue={4} size="small" readOnly />

          <div className="flex items-center gap-4 mt-2 mb-2">
            <span className="old price text-[14px] font-semibold">$58.00</span>
            <span className="old price line-through text-gray-500 text-[14px] font-[500]">
              $58.00
            </span>
            <span className="old price text-primary text-[14px] font-semibold">
              55% OFF
            </span>
          </div>

          <Button className="btn-org btn-sm">Add to Cart</Button>
        </div>
      </div>
    </>
  );
};

export default MyListItems;
