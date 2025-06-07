import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../components/uploadBox";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

const AddCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  // This function updates both previews and formFields.images
  const setPreviewsFun = (newImages) => {
    setFormFields((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Remove image handler
  const removeImage = (index) => {
    setFormFields((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50">
        <form className="form p-8 py-3">
          <div className="grid grid-cols-1 pb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Category Name
              </h3>
              <input
                type="text"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              />
            </div>
          </div>

          <br />
          <h3 className="text-[18px] text-black font-[500] mb-1">
            Category Image
          </h3>
          <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-7 gap-4">
              {Array.isArray(formFields.images) &&
                formFields.images.length > 0 &&
                formFields.images.map((image, index) => (
                  <div className="imageBoxWrapper relative" key={index}>
                    <span
                      className="absolute -top-[5px] -right-[5px] w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 flex items-center justify-center z-50 cursor-pointer"
                      onClick={() => removeImage(index)}
                    >
                      <IoMdClose className="text-white text-[17px]" />
                    </span>

                    <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                      <LazyLoadImage
                        className="w-full h-full object-cover"
                        alt={`image-${index}`}
                        effect="blur"
                        src={image}
                      />
                    </div>
                  </div>
                ))}

              <UploadBox
                multiple={true}
                url="/api/category/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>

          <br />
          <br />
          <div className="w-[250px]">
            <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddCategory;
