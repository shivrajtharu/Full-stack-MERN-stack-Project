import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";

const EditSubCatBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState(props?.selectedCatId || "");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    parentCatName: props?.selectedCatName || "",
    name: props?.name || "",
    parentId: props?.selectedCatId || "",
  });

  const context = useContext(MyContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedCat = props?.catData?.find((cat) => cat._id === selectedId);
    setSelectVal(selectedId);
    setFormFields((prev) => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedCat?.name || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.name.trim()) {
      context.notify("Please Enter Category Name", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await editData(`/api/category/${props?.id}`, formFields);
      if (res?.success) {
        context.notify(res?.data?.message || "Category updated", "success");
        context.fetchCategories?.(); // Make sure this function exists in context
        setEditMode(false);
      } else {
        context.notify(res?.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      context.notify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormFields({
      name: props?.name,
      parentId: props?.selectedCatId,
      parentCatName: props?.selectedCatName,
    });
    setSelectVal(props?.selectedCatId);
    context.notify("Edit cancelled", "info");
    setEditMode(false);
  };

  const deleteCat = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      await deleteData(`/api/category/${id}`);
      context.setRefreshToggle((prev) => !prev);
      context.notify("Category deleted", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      context.notify("Failed to delete category", "error");
    }
  };

  return (
    <div>
      <form className="w-full flex items-center gap-3 p-0 px-4" onSubmit={handleSubmit}>
        {editMode ? (
          <div className="flex items-center gap-4 py-2 w-full">
            <div className="w-[150px]">
              <Select
                className="w-full"
                size="small"
                value={selectVal}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Category select" }}
              >
                {props?.catData?.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <input
              type="text"
              name="name"
              className="w-[40%] h-[40px] border border-[rgba(0,0,0,0.2)]
                focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              value={formFields.name}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-2">
              <Button type="submit" variant="contained" size="small">
                {isLoading ? <CircularProgress size={18} color="inherit" /> : "Edit"}
              </Button>
              <Button variant="outlined" size="small" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span className="font-[500] text-[14px]">{props.name}</span>
            <div className="flex items-start ml-auto gap-2">
              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
                onClick={() => setEditMode(true)}
              >
                <MdOutlineModeEdit />
              </Button>
              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
                onClick={() => deleteCat(props?.id)}
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditSubCatBox;
