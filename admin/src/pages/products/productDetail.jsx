import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  MdBrandingWatermark,
  MdFilterVintage,
  MdRateReview,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetail = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const [product, setProduct] = useState();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSml.current.swiper.slideTo(index);
  };

  const { id } = useParams();
  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setProduct(res?.product);
        }, 1000);
      }
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between py-5 pb-0 w-full ">
        <h2 className="text-[18px] font-[600]">Product Details</h2>
      </div>
      <br />

      {product?._id !== "" &&
      product?._id !== undefined &&
      product?._id !== null ? (
        <>
          <div className="productDetails flex gap-8">
            <div className="w-[40%]">
              {(product?.images?.length ?? 0) !== 0 && (
                <div className="flex gap-3">
                  <div className="slider w-[15%]">
                    <Swiper
                      ref={zoomSliderSml}
                      direction={"vertical"}
                      slidesPerView={5}
                      spaceBetween={100}
                      modules={[Navigation]}
                      navigation={true}
                      className={`zoomProductSliderThumb h-[400px] overflow-hidden ${
                        product?.images?.length > 5 ? "space" : ""
                      }`}
                    >
                      {product?.images?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`item cursor-pointer group ${
                              slideIndex === index
                                ? "opacity-100"
                                : "opacity-40"
                            }`}
                            onClick={() => goto(index)}
                          >
                            <img
                              src={item}
                              alt="thumbnail"
                              className="transition-all group-hover:scale-105"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div
                    className="zoomContainer w-[85%] h-[400px] overflow-hidden rounded-xl"
                    onClick={() => goto(5)}
                  >
                    <Swiper
                      ref={zoomSliderBig}
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <InnerImageZoom
                              zoomType="hover"
                              zoomScale={1}
                              src={item}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[60%]">
              <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <MdBrandingWatermark className="opacity-65" /> Brand :{" "}
                </span>
                <span className="text-[14px]">{product?.brand}</span>
              </div>

              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <BiSolidCategoryAlt className="opacity-65" /> Category :{" "}
                </span>
                <span className="text-[14px]">{product?.catName}</span>
              </div>

              {(product?.productRam?.length ?? 0) > 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                    <MdFilterVintage className="opacity-65" /> Ram :{" "}
                  </span>
                  <div className="flex items-center gap-2">
                    {product?.productRam?.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm bg-[#fff] p-1 text-[12px] font-[500] rounded-md"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {(product?.size?.length ?? 0) > 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                    <MdFilterVintage className="opacity-65" /> Size :{" "}
                  </span>
                  <div className="flex items-center gap-2">
                    {product?.size?.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm bg-[#fff] p-1 text-[12px] font-[500] rounded-md"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {(product?.productWeight?.length ?? 0) > 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                    <MdFilterVintage className="opacity-65" /> Weight :{" "}
                  </span>
                  <div className="flex items-center gap-2">
                    {product?.productWeight?.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm bg-[#fff] p-1 text-[12px] font-[500] rounded-md"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <MdRateReview className="opacity-65" /> Review :{" "}
                </span>
                <span className="text-[14px]">
                  ({product?.reviews?.length > 0 ? product?.reviews?.length : 0}
                  ) Review
                </span>
              </div>

              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <BsPatchCheckFill className="opacity-65" /> Published :{" "}
                </span>
                <span className="text-[14px]">
                  {product?.createdAt?.split("T")[0]}
                </span>
              </div>

              <br />

              <h2 className="text-[20px] font-[500] mb-3">
                Product Description
              </h2>
              {(product?.description?.length ?? 0) > 0 && (
                <p className="text-[14px]">{product?.description}</p>
              )}
            </div>
          </div>

          <br />

          <h2 className="text-[18px] font-[500] mb-3">Customer Reviews</h2>

          <div className="reviewsWrap mt-3">
            <div className="reviews w-full h-auto p-4 bg-white shadow-md rounded-md flex items-center justify-between mb-4">
              <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/du2fkpf7p/image/upload/v1750660588/1750660587317-bag.jpg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500]">Shivraj Tharu</h4>
                    <Rating name="read-only" value={4} readOnly size="small" />
                  </div>
                  <span className="text-[13px]">2025-06-20</span>
                  <p className="text-[13px] mt-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
