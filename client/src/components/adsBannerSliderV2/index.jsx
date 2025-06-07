import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import BannerBoxV2 from "../bannerBoxV2";


const AdsBannerSliderV2 = (props) => {
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
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2 info='left' img='https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'/>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </>
  );
};

export default AdsBannerSliderV2;
