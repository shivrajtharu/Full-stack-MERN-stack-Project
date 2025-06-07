import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from "swiper/modules";
import ProductItem from '../productItem';

const ProductsSlider = (props) => {
  return (
    <>
      <div className="productsSlider py-3">
        <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper"    
      >
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
            <ProductItem />
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};

export default ProductsSlider;
