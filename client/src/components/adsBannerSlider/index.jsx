import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import BannerBox from "../bannerBox";

const AdsBannerSlider = (props) => {
  return (
    <>
      <div className="py-5 w-full">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          className="smlBtn"
        >
          <SwiperSlide>
            <BannerBox img={'/banner1.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={'/banner2.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={'/banner3.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={'/banner4.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={'/banner5.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={'/banner6.jpg.webp'} link={'/'}/>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </>
  );
};

export default AdsBannerSlider;
