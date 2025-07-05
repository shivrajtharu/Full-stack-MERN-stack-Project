import { useContext, useEffect, useState } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import UploadBox from "../../components/uploadBox";

const EditHomeSlide = ({ onHomeSlideAdded }) => {
  const [formFields, setFormFields] = useState({ images: [] });
  const [deletedImages, setDeletedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const homeSlideId = context?.isOpenFullScreenPanel?.id;

  useEffect(() => {
    const fetchSlide = async () => {
      if (!homeSlideId) return;
      try {
        const res = await fetchDataFromApi(`/api/homeSlide/${homeSlideId}`);
        if (res?.HomeSlide) {
          setFormFields({ images: res.HomeSlide.images || [] });
        }
      } catch (error) {
        console.error("Error fetching HomeSlide:", error);
      }
    };
    fetchSlide();
  }, [homeSlideId]);

  const setPreviewsFun = (update) => {
    setFormFields((prev) => {
      const newImages = typeof update === "function" ? update(prev.images) : update;
      const removed = prev.images.filter((img) => !newImages.includes(img));
      setDeletedImages((prevDel) => [...new Set([...prevDel, ...removed])]);
      return { ...prev, images: newImages };
    });
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
      const res = await editData(`/api/homeSlide/${homeSlideId}`, {
        images: formFields.images,
        deletedImages,
      });

      if (res?.success) {
        context.notify(res.message, "success");
        context.setIsOpenFullScreenPanel({ open: false });
        onHomeSlideAdded?.();
      } else {
        context.notify(res?.message || "Update failed", "error");
      }
    } catch (err) {
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
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-blue-600 text-white rounded-md"
      >
        {isLoading ? <CircularProgress color="inherit" size={20} /> : "Update HomeSlide"}
      </button>
    </form>
  );
};

export default EditHomeSlide;
