import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSml.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="flex gap-3 mt-8">
        <div className="slider w-[18%]">
          <Swiper
            ref={zoomSliderSml}
            direction={"vertical"}
            slidesPerView={5}
            spaceBetween={100}
            modules={[Navigation]}
            navigation={true}
            className={`zoomProductSliderThumb h-[500px] overflow-hidden ${props?.length > 5 && 'space'}`}
          >
            {props?.images?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className={`item rounded-md overflow-hidden cursor-pointer group ${
                      slideIndex === index ? "opacity-1" : "opacity-40"
                    }`}
                    onClick={() => goto(index)}
                  >
                    <img
                      src={image}
                      alt="image"
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>
        <div
          className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-xl"
          onClick={() => goto(5)}
        >
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
          >
            {props?.images?.map((innerImage, _index) => {
              return (
                <SwiperSlide key={_index}>
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={innerImage}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
