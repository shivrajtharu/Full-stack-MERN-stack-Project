import { useContext, useState } from "react";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { Button, CircularProgress } from "@mui/material";
import UploadBox from "../../components/uploadBox";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddCategory = ({ onCategoryAdded }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setPreviewsFun = (update) => {
    setFormFields((prev) => ({
      ...prev,
      images: typeof update === "function" ? update(prev.images) : update,
    }));
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
      name: formFields.name.trim(),
      images: formFields.images,
    };

    try {
      const res = await postData("/api/category/create-category", payload);

      if (res?.success) {
        onCategoryAdded?.();
        setFormFields({ name: "", images: [] });

        setTimeout(() => {
          context.notify(res?.message, "success");
          context.setIsOpenFullScreenPanel({ open: false });
          navigate('/category/list')
          setIsLoading(false);
        }, 1200);
      } else {
        context.notify(res?.message || "Failed to create category", "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Add Category Error:", error);
      context.notify("Something went wrong", "error");
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

      <div className="w-[250px]">
        <Button
          type="submit"
          className="btn-blue btn-lg w-full flex gap-2"
          disabled={isLoading === true ? true : false}
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

export default AddCategory;
