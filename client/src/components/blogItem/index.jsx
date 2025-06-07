import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = () => {
  return (
    <>
      <div className="blogItem group">
        <div className="imgWrapper w-full rounded-md overflow-hidden cursor-pointer relative">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
            className="w-full transition-all group-hover:rotate-1 group-hover:scale-105"
            alt="blog image"
          />
          <span className="flex items-center justify-center text-white bg-primary text-[11px] font-semibold rounded-md absolute bottom-[15px] right-[15px] z-50 p-1 gap-2">
            <IoMdTime className="text-[16px]" /> 5 APRIL, 2025
          </span>
        </div>
        <div className="info py-4">
          <h2 className="text-[15px] text-black font-semibold">
            <Link to={"/"} className="link">
              Nullam ullamcorper ornare molestie
            </Link>
          </h2>
          <p className="text-[13px] text-[rgba(0,0,0,0.8)] font-[400] mb-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry....
          </p>
          <Link
            to={"/"}
            className="link font-[500] text-[14px] flex items-center gap-1 underline">
            Read More <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
