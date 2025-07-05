import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";

const HomeCatSlider = () => {
  const context = useContext(MyContext);

  return (
    <div className="homeCatSlider pt-4 py-8">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          className="mySwiper"
        >
          {context?.catData?.length > 0 &&
            context?.catData?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to="/">
                    <div className="item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col">
                      <img
                        src={item?.images[0]}
                        alt="category"
                        className="w-[60px] transition-all"
                      />
                      <h4 className="text-[15px] font-semibold mt-3">
                        {
                            item?.name
                        }
                      </h4>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
