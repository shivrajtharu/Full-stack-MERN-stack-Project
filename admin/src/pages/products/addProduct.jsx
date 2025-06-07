import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import UploadBox from "../../components/uploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";


const AddProduct = () => {
  const [productCat, setproductCat] = useState("");
  const [productSubCat, setproductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");

  const handleChangeProductCat = (event) => {
    setproductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setproductSubCat(event.target.value);
  };
  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };
  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
  };
  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <>
      <section className="p-5 bg-gray-50">
        <form className="form p-8 py-3">
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 pb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-1 pb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productSubCatDrop"
                className="w-full"
                size="small"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productFeature"
                className="w-full"
                size="small"
                value={productFeatured}
                label="Feature"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product RAMS
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productFeature"
                className="w-full"
                size="small"
                value={productRams}
                label="Feature"
                onChange={handleChangeProductRams}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"4GB"}>4GB</MenuItem>
                <MenuItem value={"6GB"}>6GB</MenuItem>
                <MenuItem value={"8GB"}>8GB</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Weight
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productWeight"
                className="w-full"
                size="small"
                value={productWeight}
                label="Weight"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>2KG</MenuItem>
                <MenuItem value={20}>4KG</MenuItem>
                <MenuItem value={30}>5KG</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Size
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productSize"
                className="w-full"
                size="small"
                value={productSize}
                label="Size"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Rating
              </h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>

          <div className="col w-full p-5 px-0 ">
            <h3 className="text-[18px] font-[700] mb-3">Media & Images</h3>

            <div className="grid grid-cols-7 gap-4">
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>

              <UploadBox multiple={true} />
            </div>
          </div>
          </div>
          <hr />
          <br />
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white"/>Publish and View
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddProduct;
