import { useContext, useState } from "react";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { Button, CircularProgress } from "@mui/material";
import UploadBox from "../../components/uploadBox";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddHomeSlide = ({ onHomeSlideAdded }) => {
  const [formFields, setFormFields] = useState({ images: [] });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const setPreviewsFun = (update) => {
    setFormFields((prev) => ({
      ...prev,
      images: typeof update === "function" ? update(prev.images) : update,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.images.length === 0) {
      context.notify("Please Select HomeSlide Image", "error");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/homeSlide/create-homeSlide", {
        images: formFields.images,
      });

      if (res?.success) {
        context.notify(res.message, "success");
        context.setIsOpenFullScreenPanel({ open: false });
        setFormFields({ images: [] });
        onHomeSlideAdded?.();
      } else {
        context.notify(res?.message || "Failed to create HomeSlide", "error");
      }
    } catch (err) {
      console.error("Add HomeSlide Error:", err);
      context.notify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 my-4 rounded-md">
      <UploadBox
        url="/api/homeSlide/uploadImages"
        multiple
        previews={formFields.images}
        setPreviewsFun={setPreviewsFun}
      />
      <div className="w-[250px]">
        <Button
          type="submit"
          className="btn-blue btn-lg w-full flex gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <>
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddHomeSlide;
