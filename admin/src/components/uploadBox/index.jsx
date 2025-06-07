import { useState, useEffect, useContext } from "react";
import { FaRegImages } from "react-icons/fa6";
import { postData, uploadImages } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  let selectedImages = [];
  const formdata = new FormData();

  useEffect(() => {
    const images = context?.userData?.images;
    if (images && images !== "false") {
      setPreviews([images]);
    } else {
      setPreviews([]);
    }
  }, [context?.userData?.images]);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append("images", file);
        } else {
          context.notify(
            "Only JPG, JPEG, PNG, or WEBP images are allowed.",
            "error"
          );
          setUploading(false);
          return false;
        }
      }

      uploadImages(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        const uploadedImages = Array.isArray(res?.data?.images)
          ? res.data.images
          : [res.data.images]; // Ensure it's an array
         console.log("Uploaded images:", res.data.images);
        props.setPreviewsFun(uploadedImages);
      });

    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };


  return (
    <>
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
        <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
        <input
          type="file"
          accept="image/*"
          multiple={props.multiple !== undefined ? props.multiple : false}
          className="absolute top-0 left-0 opacity-0 w-full h-full z-50"
          name="images"
          onChange={(e) => onChangeFile(e, props?.url)}
        />
      </div>
    </>
  );
};

export default UploadBox;
