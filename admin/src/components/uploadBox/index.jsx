import { useState, useContext, useRef } from "react";
import { FaRegImages } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { uploadImages, deleteData } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";
import { CircularProgress } from "@mui/material";

const UploadBox = ({
  previews = [],
  setPreviewsFun,
  url,
  multiple = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [removingIndex, setRemovingIndex] = useState(null);
  const context = useContext(MyContext);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async (indexToRemove) => {
    const imgUrl = previews[indexToRemove];
    if (!imgUrl) return;

    try {
      setRemovingIndex(indexToRemove);

      const res = await deleteData(
        `/api/category/delete-image?img=${encodeURIComponent(imgUrl)}`
      );

      if (res?.success) {
        // Remove image from previews AND update parent state
        setPreviewsFun((prev) =>
          prev.filter((_, idx) => idx !== indexToRemove)
        );
        context.notify("Image removed successfully.", "success");
      } else {
        context.notify("Failed to remove image.", "error");
      }
    } catch (error) {
      console.error("Remove image error:", error);
      context.notify("Error while removing image.", "error");
    } finally {
      setRemovingIndex(null);
    }
  };

  const onChangeFile = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    const maxSize = 2 * 1024 * 1024; // 2MB

    for (const file of files) {
      const isValidType = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ].includes(file.type);
      const isValidSize = file.size <= maxSize;

      if (!isValidType) {
        context.notify(
          "Only JPG, JPEG, PNG, or WEBP images are allowed.",
          "error"
        );
        e.target.value = "";
        return;
      }

      if (!isValidSize) {
        context.notify(
          `"${file.name}" is too large. Max allowed size is 2MB.`,
          "error"
        );
        e.target.value = "";
        return;
      }

      formData.append("images", file);
    }

    setUploading(true);
    try {
      const res = await uploadImages(url, formData);

      const uploadedImages = res?.data?.images || res?.data?.bannerImages || [];

      if (!uploadedImages.length) {
        context.notify("Upload failed or invalid response.", "error");
        return;
      }

      // Append new images to current previews and update parent state
      setPreviewsFun((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Upload error:", error);
      context.notify("Upload failed.", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div
        className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] min-h-[150px] w-[150px] bg-gray-100 cursor-pointer hover:bg-gray-200 relative flex-shrink-0"
        onClick={handleUploadClick}
      >
        <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
          <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
          <h4 className="text-[14px] pointer-events-none text-center px-2">
            {uploading ? (
              <CircularProgress className="!text-gray-400" />
            ) : (
              "Click to Upload Image(s)"
            )}
          </h4>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={onChangeFile}
        />
      </div>

      {/* Preview Images */}
      <div className="flex flex-wrap gap-4">
        {previews.map((imgUrl, idx) => (
          <div
            key={idx}
            className="relative w-[150px] h-[150px] border border-dashed border-[rgba(0,0,0,0.3)] rounded-md overflow-hidden group"
          >
            <img
              src={imgUrl}
              alt={`preview-${idx}`}
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
              disabled={removingIndex === idx}
            >
              {removingIndex === idx ? (
                <CircularProgress size={18} className="!text-white" />
              ) : (
                <MdClose size={18} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadBox;
