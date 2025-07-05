import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import TooltipMui from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "../../components/searchBox";
import Rating from "@mui/material/Rating";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdSubCategoryFilterVal, setThirdSubCategoryFilterVal] = useState("");
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromApi(
        `/api/product?page=${page + 1}&perPage=${rowsPerPage}`
      );

      const productArr = Array.isArray(res?.data)
        ? res.data.map((item) => ({ ...item, checked: false }))
        : [];

      setProductData(productArr);
      setTotalCount(res?.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch Products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (!context.isOpenFullScreenPanel?.open) {
      fetchProducts();
    }
  }, [context.isOpenFullScreenPanel?.open]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    const ids = isChecked
      ? updatedItems.map((item) => item._id).sort((a, b) => a.localeCompare(b))
      : [];
    setSortedIds(ids);
  };

  const handleCheckBoxChange = (e, id) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: e.target.checked } : item
    );
    setProductData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a.localeCompare(b));
    setSortedIds(selectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
    setSubCategoryFilterVal("");
    setThirdSubCategoryFilterVal("");
    setPage(0);
  };

  const handleChangeSubCatFilter = (event) => {
    setSubCategoryFilterVal(event.target.value);
    setCategoryFilterVal("");
    setThirdSubCategoryFilterVal("");
    setPage(0);
  };

  const handleChangeThirdSubCatFilter = (event) => {
    setThirdSubCategoryFilterVal(event.target.value);
    setCategoryFilterVal("");
    setSubCategoryFilterVal("");
    setPage(0);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Product?")) return;
    try {
      await deleteData(`/api/product/${id}`);
      setProductData((prev) => prev.filter((item) => item._id !== id));
      context.notify("Product deleted successfully", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      context.notify("Failed to delete product", "error");
    }
  };

  const deleteMultipleProduct = async () => {
    if (!sortedIds.length) {
      context.notify("Please select items to delete.", "error");
      return;
    }
    try {
      await deleteMultipleData(`/api/product/deleteMultiple`, {
        ids: sortedIds,
      });
      await fetchProducts();
      setSortedIds([]);
      context.notify("Products deleted successfully", "success");
    } catch (error) {
      context.notify("Error deleting items.", "error");
    }
  };

  const openEditProduct = (productId) => {
    context.setIsOpenFullScreenPanel({
      open: true,
      model: "Edit Product",
      id: productId,
    });
  };

  const filteredData = productData.filter((p) => {
    return (
      (!categoryFilterVal || p.catId === categoryFilterVal) &&
      (!subCategoryFilterVal || p.subCatId === subCategoryFilterVal) &&
      (!thirdSubCategoryFilterVal || p.thirdSubCatId === thirdSubCategoryFilterVal)
    );
  });

  const paginatedData = filteredData;

  return (
    <>
      <div className="flex items-center justify-between py-5 pb-0 w-full">
        <h2 className="text-[18px] font-[600]">
          Products <span className="text-[14px] font-[400]">(Material UI Table)</span>
        </h2>
        <div className="col2 w-[40%] ml-auto flex items-center gap-3 justify-end">
          {sortedIds.length > 0 && (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={deleteMultipleProduct}
            >
              Delete ({sortedIds.length})
            </Button>
          )}
          <Button className="btn btn-sm !bg-green-600 !text-white">Export</Button>
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Filter UI */}
      <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <div className="flex items-center w-full px-5 pb-5 justify-between">
          <div className="flex items-center gap-4 w-full px-5 pb-5">
            {/* Category Filter */}
            <div className="col1 w-[15%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
                className="w-full"
                style={{ zoom: "80%" }}
                size="small"
                value={categoryFilterVal}
                onChange={handleChangeCatFilter}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...new Set(productData.map((p) => p.catId))].map((catId, index) => {
                  const item = productData.find((p) => p.catId === catId);
                  return (
                    <MenuItem key={catId || index} value={catId}>
                      {item?.catName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            {/* Subcategory Filter */}
            <div className="col1 w-[15%]">
              <h4 className="font-[600] text-[13px] mb-2">Sub Category By</h4>
              <Select
                className="w-full"
                style={{ zoom: "80%" }}
                size="small"
                value={subCategoryFilterVal}
                onChange={handleChangeSubCatFilter}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...new Set(productData.map((p) => p.subCatId))].map((subId, index) => {
                  const item = productData.find((p) => p.subCatId === subId);
                  return (
                    <MenuItem key={subId || index} value={subId}>
                      {item?.subCat}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            {/* Third Level Category Filter */}
            <div className="col1 w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Third Level Category By</h4>
              <Select
                className="w-full"
                style={{ zoom: "80%" }}
                size="small"
                value={thirdSubCategoryFilterVal}
                onChange={handleChangeThirdSubCatFilter}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...new Set(productData.map((p) => p.thirdSubCatId))].map((thirdId, index) => {
                  const item = productData.find((p) => p.thirdSubCatId === thirdId);
                  return (
                    <MenuItem key={thirdId || index} value={thirdId}>
                      {item?.thirdSubCat}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>

          <div className="col2 w-[20%]">
            <SearchBox />
          </div>
        </div>

        {/* Table */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    size="small"
                    onChange={handleSelectAll}
                    checked={paginatedData.length > 0 && paginatedData.every((item) => item.checked)}
                    inputProps={{ "aria-label": "Select all products" }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((product, index) => (
                  <TableRow key={product._id || index}>
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={!!product.checked}
                        onChange={(e) => handleCheckBoxChange(e, product._id)}
                      />
                    </TableCell>
                    <TableCell className="!pr-0 !py-2">
                      <div className="flex items-center gap-4 w-[300px]">
                        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                          <Link to={`/products/${product?._id || "default"}`}>
                            <img
                              src={product?.images?.[0] || "/placeholder.jpg"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all"
                              alt={product?.name || "product image"}
                            />
                          </Link>
                        </div>
                        <div className="info w-[75%]">
                          <h3 className="font-[600] text-[12px] leading-4 hover:text-primary line-clamp-2">
                            <Link to={`/products/${product?._id || "default"}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <span className="text-[12px] text-gray-500">Brands:&nbsp;</span>
                          <span className="text-[12px]">{product?.brand || "N/A"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product?.catName || "N/A"}</TableCell>
                    <TableCell>{product?.subCat || "N/A"}</TableCell>
                    <TableCell>
                      <span className="line-through text-gray-500">₹{product.oldPrice || 0}</span>
                      <br />
                      <span className="text-primary">₹{product?.price || 0}</span>
                    </TableCell>
                    <TableCell>{product.sale || 0} sale</TableCell>
                    <TableCell>
                      <Rating
                        name="half-rating"
                        precision={0.5}
                        value={product?.rating}
                        size="small"
                        readOnly
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-2">
                        <TooltipMui title="Edit Product" placement="top">
                          <Button
                            className="!h-[32px] !w-[32px] !min-w-[32px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]"
                            onClick={() => openEditProduct(product._id)}
                          >
                            <AiOutlineEdit className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </TooltipMui>
                        <TooltipMui title="View Product Detail" placement="top">
                          <Link to={`/product/${product._id}`}>
                            <Button className="!h-[32px] !w-[32px] !min-w-[32px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]">
                              <FaRegEye className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </Link>
                        </TooltipMui>
                        <TooltipMui title="Remove Product" placement="top">
                          <Button
                            className="!h-[32px] !w-[32px] !min-w-[32px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <GoTrash className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </TooltipMui>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Products;
