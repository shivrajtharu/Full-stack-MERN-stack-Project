import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import AddThirdLevelCategory from "./addThirdLevelCategory";
import { useNavigate } from "react-router-dom";

const AddSubCategory = ({ onCategoryAdded }) => {
  const [subCategory, setSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    parentCatName: null,
    name: "",
    parentId: null,
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSubCat = (event) => {
    const selectedId = event.target.value;
    setSubCategory(selectedId);
    const selectedCat = context.catData.find((item) => item._id === selectedId);

    if (selectedCat) {
      setFormFields((prev) => ({
        ...prev,
        parentId: selectedId,
        parentCatName: selectedCat.name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.parentCatName) {
      context.notify("Please select a product category", "error");
      setIsLoading(false);
      return;
    }

    if (formFields.name.trim() === "") {
      context.notify("Please enter subcategory name", "error");
      setIsLoading(false);
      return;
    }

    const payload = {
      name: formFields.name.trim(),
      parentCatName: formFields.parentCatName.trim(),
      parentId: formFields.parentId,
    };

    try {
      const res = await postData("/api/category/create-category", payload);
      if (res?.success) {
        onCategoryAdded?.();
        setFormFields({ name: "", parentCatName: null, parentId: null });
        setSubCategory("");
        setTimeout(() => {
          context.notify(res?.message, "success");
          context.setIsOpenFullScreenPanel({ open: false });
          navigate('/subCategory/list')
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
    <section className="p-5 bg-gray-50 grid grid-cols-2 gap-10">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <h4 className="font-[600] mb-4">Add Sub Category</h4>
        <div className="grid grid-cols-2 pb-3 gap-5">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Category
            </h3>
            <Select
              id="categoryDrop"
              className="w-full"
              size="small"
              value={subCategory || ""}
              onChange={handleChangeSubCat}
            >
              {context?.catData?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Sub Category
            </h3>
            <input
              type="text"
              name="name"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formFields.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-[250px] mt-5">
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

      <div className="w-full">
        <AddThirdLevelCategory onCategoryAdded={onCategoryAdded} />
      </div>
    </section>
  );
};

export default AddSubCategory;
