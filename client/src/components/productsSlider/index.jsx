import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import ProductItem from "../productItem";
import { useEffect, useRef } from "react";

const ProductsSlider = (props) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update(); // Force Swiper to resize
    }
  }, [props.data]);

  return (
    <div className="productsSlider py-3">
      <Swiper
        ref={swiperRef}
        slidesPerView={props.items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper"
      >
        {props?.data?.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
