import HomeSLider from "../../components/homeSlider";
import HomeCatSlider from "../../components/homeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/adsBannerSlider";
import AdsBannerSliderV2 from "../../components/adsBannerSliderV2";
import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductsSlider from "../../components/productsSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import BlogItem from "../../components/blogItem";
import HomeSLiderV2 from "../../components/homeSliderV2";
import BannerBoxV2 from "../../components/bannerBoxV2";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { MyContext } from "../../App";
import ProductLoading from "../../components/productLoading";

const Home = () => {
  const [value, setValue] = React.useState(0);
  const [homeSlideData, setHomeSlideData] = useState([]);
  const [PopularProductData, setPopularProductData] = useState([]);
  const [allProductData, setAllProductData] = useState([]);
  const [allFeaturedProductData, setAllFeaturedProductData] = useState([]);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchDataFromApi("/api/homeSlide/").then((res) => {
      if (res?.error === false) {
        setHomeSlideData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/").then((res) => {
      if (res?.error === false) {
        setAllProductData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/featured-products").then((res) => {
      if (res?.error === false) {
        setAllFeaturedProductData(res?.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/list-productsByCatId/${context?.catData[0]?._id}`
    ).then((res) => {
      if (res?.error === false) {
        setPopularProductData(res?.products);
      }
    });
  }, [context?.catData]);

  const filterByCatId = (id) => {
    setPopularProductData([]);
    fetchDataFromApi(`/api/product/list-productsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductData(res?.products);
      }
    });
  };

  return (
    <>
      {homeSlideData?.length > 0 && <HomeSLider data={homeSlideData} />}

      <HomeCatSlider />

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[22px] font-semibold">Popular Products</h2>
              <p className="text-[14px] font-[400] mt-0 mb-0">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData?.length > 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        key={index}
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>
          {PopularProductData?.length === 0 && <ProductLoading />}
          {PopularProductData?.length > 0 && (
            <ProductsSlider items={5} data={PopularProductData} />
          )}
        </div>
      </section>

      <section className="py-6">
        <div className="container flex gap-5">
          <div className="part1 w-[70%]">
            {allProductData?.length > 0 && (
              <HomeSLiderV2 data={allProductData} />
            )}
          </div>
          <div className="part2 w-[30%] flex flex-col items-center justify-between gap-5">
            <BannerBoxV2
              info="left"
              img="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
            />

            <BannerBoxV2
              info="right"
              img="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-4 pt-2">
        <div className="container">
          <div className=" freeShipping w-[90%] m-auto  p-4 border-2 border-[#f03170] flex items-center justify-between rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2">
              <p className="mb-0 font-[500]">
                Free Delivery Now On Your First Order And Over $200
              </p>
            </div>

            <p className="text-[25px] font-bold">- Only $200*</p>
          </div>
          <AdsBannerSliderV2 items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-semibold mb-1">Latest Products</h2>
          {allProductData?.length === 0 && <ProductLoading />}
          {allProductData?.length > 0 && (
            <ProductsSlider items={5} data={allProductData} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-semibold mb-1">Featured Products</h2>
          {allFeaturedProductData?.length === 0 && <ProductLoading />}
          {allFeaturedProductData?.length > 0 && (
            <ProductsSlider items={5} data={allFeaturedProductData} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className=" blogSection pb-8 py-5 pt-0 bg-white">
        <div className=" container py-5">
          <h2 className="text-[22px] font-semibold mb-5">From The Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            modules={[Navigation]}
            navigation={true}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;
