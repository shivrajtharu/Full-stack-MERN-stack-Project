import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

const HomeCatSlider = () => {
  return (
    <div className='homeCatSlider pt-4 py-8'>
      <div className='container'>
        <Swiper
        slidesPerView={8}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper"    
      >
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525204708_fash.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Fashion</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525218436_ele.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Electronics</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525231018_bag.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Bags</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525239704_foot.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Footwear</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525248057_gro.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Groceries</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525255799_beauty.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Beauty</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525275367_well.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Wellness</h4>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to='/'>
            <div className='item px-3 py-7 bg-white rounded-md shadow-md text-center flex items-center justify-center flex-col'>
                <img src='https://api.spicezgold.com/download/file_1734525286186_jw.png' alt='category' className='w-[60px] transition-all' />
                <h4 className='text-[15px] font-semibold mt-3'>Jwellery</h4>
            </div>
            </Link>
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default HomeCatSlider
