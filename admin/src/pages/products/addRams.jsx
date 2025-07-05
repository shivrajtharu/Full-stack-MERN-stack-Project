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

const AddRams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({ name: "" });
  const [ramList, setRamList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const context = useContext(MyContext);

  const fetchRams = async () => {
    try {
      const res = await fetchDataFromApi("/api/product/productRams");
      if (res?.success) {
        setRamList(res.data);
      } else {
        context.notify("Failed to fetch RAM list", "error");
      }
    } catch (error) {
      context.notify("Fetch error", "error");
    }
  };

  useEffect(() => {
    fetchRams();
  }, []);

  const OnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name.trim()) {
      context.notify("Please enter product RAM name", "error");
      setIsLoading(false);
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await editData(
          `/api/product/updateProductRam/${editingId}`,
          formFields
        );
      } else {
        res = await postData("/api/product/productRams/create", formFields);
      }

      if (res?.success) {
        setFormFields({ name: "" });
        setEditingId(null);
        context.notify(
          editingId
            ? "Product RAM updated successfully"
            : "Product RAM created successfully",
          "success"
        );
        fetchRams();
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
      const res = await deleteData(`/api/product/productRams/${id}`);
      if (res?.success) {
        context.notify("Product RAM deleted", "success");
        fetchRams();
      } else {
        context.notify("Failed to delete RAM", "error");
      }
    } catch (error) {
      context.notify("Delete failed", "error");
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      const res = await deleteMultipleData(`/api/product/deleteMultipleRams`, {
        ids: selectedIds,
      });

      if (res?.success) {
        context.notify("Selected RAMs deleted", "success");
        setSelectedIds([]);
        fetchRams();
      } else {
        context.notify("Failed to delete selected RAMs", "error");
      }
    } catch (err) {
      context.notify("Error deleting selected RAMs", "error");
    }
  };

  const editRam = async (id) => {
    try {
      const res = await fetchDataFromApi(`/api/product/productRams/${id}`);
      if (res?.success) {
        setFormFields({ name: res.data.name });
        setEditingId(id);
      } else {
        context.notify("Failed to load RAM data", "error");
      }
    } catch (error) {
      context.notify("Error loading RAM data", "error");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <h2 className="text-[18px] font-[600]">Add Product RAMS</h2>
      <div className="card w-[65%] my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <form className="form p-8 py-3" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              PRODUCT RAM
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
                      ramList.length > 0 &&
                      selectedIds.length === ramList.length
                    }
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked ? ramList.map((item) => item._id) : []
                      )
                    }
                    size="small"
                  />
                </th>
                <th className="px-0 py-3 w-[60%]">Product RAM</th>
                <th className="px-6 py-3 w-[30%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {ramList.map((ram) => (
                <tr
                  key={ram._id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 pr-0 py-2">
                    <Checkbox
                      checked={selectedIds.includes(ram._id)}
                      onChange={() => toggleSelect(ram._id)}
                      size="small"
                    />
                  </td>
                  <td className="px-6 py-2">
                    <span className="font-[600]">{ram.name}</span>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit
                            className="text-[20px] text-[rgba(0,0,0,0.7)]"
                            onClick={() => editRam(ram?._id)}
                          />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button
                          onClick={() => handleDelete(ram._id)}
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

export default AddRams;
