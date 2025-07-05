import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";

const HomeSLiderV2 = (props) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2"
      >
        {props?.data?.map((item, index) => {
          if (item?.isDisplayOnHomeBanner === true) {
            return (
              <SwiperSlide key={index}>
                <div className="item w-full rounded-md overflow-hidden relative">
                  <img src={item?.bannerImages[0]} />

                  <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex flex-col items-center justify-center transition-all duration-700">
                    <h4 className="text-[18px] font-[500] w-full mb-3 relative -right-[100%] opacity-0">
                      {item?.bannerTitleName}
                    </h4>
                    <h2 className="text-[35px] font-bold w-full relative -right-[100%] opacity-0 line-clamp-3">
                      {item?.name}
                    </h2>
                    <h3 className=" flex items-center text-[18px] font-[500] w-full mb-3 mt-3 gap-3 relative -right-[100%] opacity-0">
                      Starting At Only
                      <span className="text-[30px] text-primary font-[650]">
                        &#8377;{item?.price}
                      </span>
                    </h3>

                    <div className="w-full btn_ relative -bottom-[100%] opacity-0">
                      <Button className="btn-org">SHOP NOW</Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </>
  );
};

export default HomeSLiderV2;
