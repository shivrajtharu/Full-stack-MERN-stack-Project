import { Link } from "react-router-dom";
import "../bannerBoxV2/style.css";

const BannerBoxV2 = (props) => {
  return (
    <>
      <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
        <img
          src={props.img}
          className="w-full transition-all duration-150 group-hover:scale-105"
        />

        <div
          className={`info absolute top-0 p-5 ${
            props.info === "left" ? "left-0" : "right-0"
          } w-[70%] h-[100%] z-50 flex flex-col items-center justify-center gap-2 ${props.info=== 'left' ? '' : 'pl-16'}`}
        >
          <h2 className="text-[18px] font-[600]">
            Samsung Gear VR Camera
          </h2>
          <span className="text-[20px] font-[600] text-primary w-full">$129.00</span>
            <Link to="/" className="text-[16px] font-[600] link w-full underline">SHOP NOW</Link>
        </div>
      </div>
    </>
  );
};

export default BannerBoxV2;
