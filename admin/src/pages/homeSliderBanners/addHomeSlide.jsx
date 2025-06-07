import { LazyLoadImage } from "react-lazy-load-image-component"
import UploadBox from "../../components/uploadBox"
import { IoMdClose } from "react-icons/io"
import { Button } from "@mui/material"
import { FaCloudUploadAlt } from "react-icons/fa"

const AddHomeSlide = () => {
  return (
    <>
        <section className="p-5 bg-gray-50">
        <form className="form p-8 py-3">
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-7 gap-4">
              <div className="imageBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp"
                  />
                </div>
              </div>

              <UploadBox multiple={true} />
            </div>
        </div>
        <br />
        <br />
          <div className="w-[250px]">
            <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white"/>Publish and View
          </Button>
          </div>
        </form>
        </section>
    </>
  )
}

export default AddHomeSlide
