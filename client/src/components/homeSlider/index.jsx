import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const HomeSLider = (props) => {
  return (
    <>
      <div className="homeSlider py-4">
        <div className="container">
          <Swiper
            spaceBetween={10}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="sliderHome"
          >
            {props?.data?.length > 0 &&
              props?.data?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="item rounded-[20px] overflow-hidden">
                      <img
                        src={item?.images[0]}
                        alt="banner"
                        className="w-full"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeSLider;
