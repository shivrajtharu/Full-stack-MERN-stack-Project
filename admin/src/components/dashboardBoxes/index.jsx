import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GoGift } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";


const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#3872fa] text-white rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <GoGift className="text-[40px]" />
            <div className="info w-[70%]">
              <h3>New Orders</h3>
              <b>1,390</b>
            </div>
            <IoStatsChartSharp className="text-[50px]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#1faf7f] text-white rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <FiPieChart className="text-[50px]" />
            <div className="info w-[70%]">
              <h3>Sales</h3>
              <b>$67,890</b>
            </div>
            <IoStatsChartSharp className="text-[50px]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#f36363] text-white rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <BsBank className="text-[40px]" />
            <div className="info w-[70%]">
              <h3>Revenue</h3>
              <b>$12,390</b>
            </div>
            <IoStatsChartSharp className="text-[50px]" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer text-white bg-[#312be1d8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <RiProductHuntLine className="text-[43px]" />
            <div className="info w-[70%]">
              <h3>Total Products</h3>
              <b>1,898</b>
            </div>
            <IoStatsChartSharp className="text-[50px]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
