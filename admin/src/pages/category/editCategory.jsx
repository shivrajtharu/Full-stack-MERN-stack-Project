import { useContext, useState, useEffect } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import UploadBox from "../../components/uploadBox";
import { useNavigate } from "react-router-dom";

const EditCategory = ({ onCategoryAdded }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [deletedImages, setDeletedImages] = useState([]);
  const categoryId = context?.isOpenFullScreenPanel?.id;

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const res = await fetchDataFromApi(`/api/category/${categoryId}`);
        if (res?.category) {
          setFormFields({
            name: res.category.name || "",
            images: res.category.images || [],
          });
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setPreviewsFun = (update) => {
    setFormFields((prev) => {
      const newImages =
        typeof update === "function" ? update(prev.images) : update;
      const removed = prev.images.filter((img) => !newImages.includes(img));
      setDeletedImages((prevDel) => [...prevDel, ...removed]);
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name.trim()) {
      context.notify("Please Enter Category Name", "error");
      setIsLoading(false);
      return;
    }

    if (formFields.images.length === 0) {
      context.notify("Please Select Category Image", "error");
      setIsLoading(false);
      return;
    }

    const payload = {
      name: formFields.name,
      images: formFields.images,
      deletedImages,
    };

    try {
      const res = await editData(`/api/category/${categoryId}`, payload);
      if (res?.success) {
        onCategoryAdded?.();
        setFormFields({ name: "", images: [] });
        context.notify(res?.message, "success");
        context.setIsOpenFullScreenPanel({ open: false });
        navigate('/category/list')
      } else {
        context.notify(res?.message || "Update failed", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      context.notify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-6 my-4 rounded-md max-w-full"
    >
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={formFields.name}
        onChange={handleChange}
      />

      <UploadBox
        url="/api/category/uploadImages"
        multiple={true}
        previews={formFields.images}
        setPreviewsFun={setPreviewsFun}
      />

      <button
        type="submit"
        className="px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          "Update Category"
        )}
      </button>
    </form>
  );
};

export default EditCategory;
