import { Button, Checkbox, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import TooltipMui from "@mui/material/Tooltip";
import { GoTrash } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";
import { MyContext } from "../../App";
import {
  postData,
  deleteData,
  fetchDataFromApi,
  editData,
  deleteMultipleData,
} from "../../utils/api";

const AddSize = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({ name: "" });
  const [data, SetData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const context = useContext(MyContext);

  const fetchSizes = async () => {
    try {
      const res = await fetchDataFromApi("/api/product/productSize");
      if (res?.success) {
        SetData(res.data);
      } else {
        context.notify("Failed to fetch Product Size list", "error");
      }
    } catch (error) {
      context.notify("Fetch error", "error");
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const OnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name.trim()) {
      context.notify("Please enter product Size name", "error");
      setIsLoading(false);
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await editData(
          `/api/product/updateProductSize/${editingId}`,
          formFields
        );
      } else {
        res = await postData("/api/product/productSize/create", formFields);
      }

      if (res?.success) {
        setFormFields({ name: "" });
        setEditingId(null);
        context.notify(
          editingId
            ? "Product Size updated successfully"
            : "Product Size created successfully",
          "success"
        );
        fetchSizes();
      } else {
        context.notify(res?.message || "Operation failed", "error");
      }
    } catch (error) {
      context.notify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(`/api/product/productSize/${id}`);
      if (res?.success) {
        context.notify("Product Size deleted", "success");
        fetchSizes();
      } else {
        context.notify("Failed to delete Product Size", "error");
      }
    } catch (error) {
      context.notify("Delete failed", "error");
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      const res = await deleteMultipleData(`/api/product/deleteMultipleSize`, {
        ids: selectedIds,
      });

      if (res?.success) {
        context.notify("Selected Sizes deleted", "success");
        setSelectedIds([]);
        fetchSizes();
      } else {
        context.notify("Failed to delete selected Sizes", "error");
      }
    } catch (err) {
      context.notify("Error deleting selected Sizes", "error");
    }
  };

  const editSize = async (id) => {
    try {
      const res = await fetchDataFromApi(`/api/product/productSizes/${id}`);
      if (res?.success) {
        setFormFields({ name: res.data.name });
        setEditingId(id);
      } else {
        context.notify("Failed to load Size data", "error");
      }
    } catch (error) {
      context.notify("Error loading Size data", "error");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((data) => data !== id) : [...prev, id]
    );
  };

  return (
    <>
      <h2 className="text-[18px] font-[600]">Add Product Size</h2>
      <div className="card w-[65%] my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <form className="form p-8 py-3" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              PRODUCT SIZE
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
              name="name"
              value={formFields.name}
              onChange={OnChangeInput}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-blue btn-lg w-full flex gap-2"
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
        </form>
      </div>

      {/* RAM List Table */}
      <div className="card w-[65%] my-5 shadow-md sm:rounded-lg bg-white pt-5">
        {selectedIds.length > 0 && (
          <div className="px-5 mb-4">
            <Button
              onClick={handleDeleteMultiple}
              className="!bg-red-500 !text-white hover:!bg-red-600"
            >
              Delete ({selectedIds.length})
            </Button>
          </div>
        )}
        <div className="relative overflow-x-auto pb-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 pr-0 py-3 w-[10%]">
                  <Checkbox
                    checked={
                      data.length > 0 &&
                      selectedIds.length === data.length
                    }
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked ? data.map((data) => data._id) : []
                      )
                    }
                    size="small"
                  />
                </th>
                <th className="px-0 py-3 w-[60%]">Product Size</th>
                <th className="px-6 py-3 w-[30%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 pr-0 py-2">
                    <Checkbox
                      checked={selectedIds.includes(item._id)}
                      onChange={() => toggleSelect(item._id)}
                      size="small"
                    />
                  </td>
                  <td className="px-6 py-2">
                    <span className="font-[600]">{item.name}</span>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex item-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit
                            className="text-[20px] text-[rgba(0,0,0,0.7)]"
                            onClick={() => editSize(item?._id)}
                          />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button
                          onClick={() => handleDelete(item._id)}
                          className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]"
                        >
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddSize;
