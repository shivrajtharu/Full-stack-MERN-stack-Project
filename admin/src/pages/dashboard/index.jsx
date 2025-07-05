import { Button, Rating } from "@mui/material";
import DashboardBoxes from "../../components/dashboardBoxes";
import { FaPlus } from "react-icons/fa6";
import { useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import TooltipMui from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MyContext } from "../../App";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import SearchBox from "../../components/searchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const data2 = [
  {
    name: "JAN",
    TotalSales: 4000,
    TotalUsers: 2400,
    amt: 2400,
  },
  {
    name: "FEB",
    TotalSales: 3000,
    TotalUsers: 1398,
    amt: 2210,
  },
  {
    name: "MARCH",
    TotalSales: 2000,
    TotalUsers: 9800,
    amt: 2290,
  },
  {
    name: "APRIL",
    TotalSales: 2780,
    TotalUsers: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    TotalSales: 1890,
    TotalUsers: 4800,
    amt: 2181,
  },
  {
    name: "JUNE",
    TotalSales: 2390,
    TotalUsers: 3800,
    amt: 2500,
  },
  {
    name: "JULY",
    TotalSales: 3490,
    TotalUsers: 4300,
    amt: 2100,
  },
  {
    name: "AUG",
    TotalSales: 3390,
    TotalUsers: 4400,
    amt: 2100,
  },
  {
    name: "SEP",
    TotalSales: 3390,
    TotalUsers: 4700,
    amt: 2100,
  },
  {
    name: "OCT",
    TotalSales: 3790,
    TotalUsers: 4800,
    amt: 2100,
  },
  {
    name: "NOV",
    TotalSales: 3890,
    TotalUsers: 4800,
    amt: 2100,
  },
  {
    name: "DEC",
    TotalSales: 3490,
    TotalUsers: 4300,
    amt: 2100,
  },
];

const data = [
  {
    name: "JAN",
    TotalSales: 4000,
    TotalUsers: 2400,
    amt: 2400,
  },
  {
    name: "FEB",
    TotalSales: 3000,
    TotalUsers: 1398,
    amt: 2210,
  },
  {
    name: "MARCH",
    TotalSales: 2000,
    TotalUsers: 9800,
    amt: 2290,
  },
  {
    name: "APRIL",
    TotalSales: 2780,
    TotalUsers: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    TotalSales: 1890,
    TotalUsers: 4800,
    amt: 2181,
  },
  {
    name: "JUNE",
    TotalSales: 2390,
    TotalUsers: 3800,
    amt: 2500,
  },
  {
    name: "JULY",
    TotalSales: 3490,
    TotalUsers: 4300,
    amt: 2100,
  },
  {
    name: "AUG",
    TotalSales: 3390,
    TotalUsers: 4400,
    amt: 2100,
  },
  {
    name: "SEP",
    TotalSales: 3390,
    TotalUsers: 4700,
    amt: 2100,
  },
  {
    name: "OCT",
    TotalSales: 3790,
    TotalUsers: 4800,
    amt: 2100,
  },
  {
    name: "NOV",
    TotalSales: 3890,
    TotalUsers: 4800,
    amt: 2100,
  },
  {
    name: "DEC",
    TotalSales: 3490,
    TotalUsers: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const [isOpenedOrderedProduct, setIsOpenedOrderedProduct] = useState(null);
  const [chart1Data, setChart1Data] = useState(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdSubCategoryFilterVal, setThirdSubCategoryFilterVal] =
    useState("");
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromApi("/api/product/");
      const productArr = Array.isArray(res?.productData)
        ? res.productData.map((item) => ({ ...item, checked: false }))
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setProductData(productArr);
    } catch (error) {
      console.error("Failed to fetch Products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = productData.map((item) => {
      const isInPage = paginatedData.some((p) => p._id === item._id);
      return isInPage ? { ...item, checked: isChecked } : item;
    });
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems
        .filter((item) => item.checked)
        .map((item) => item._id)
        .sort((a, b) => a.localeCompare(b));
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
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

  useEffect(() => {
    if (!context.isOpenFullScreenPanel?.open) {
      fetchProducts();
    }
  }, [context.isOpenFullScreenPanel?.open]);

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

   const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   const openEditProduct = (productId) => {
    context.setIsOpenFullScreenPanel({
      open: true,
      model: "Edit Product",
      id: productId,
    });
  };

   const deleteProduct = async (id) => {
      if (!window.confirm("Are you sure you want to delete this Product?"))
        return;
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
        await fetchProducts(); // Refresh products list
  
        setSortedIds([]); // Clear selected IDs to hide Delete button
  
        context.notify("Products deleted successfully", "success");
      } catch (error) {
        context.notify("Error deleting items.", "error");
      }
    };
  

  const filteredData = productData.filter((p) => {
    return (
      (!categoryFilterVal || p.catId === categoryFilterVal) &&
      (!subCategoryFilterVal || p.subCatId === subCategoryFilterVal) &&
      (!thirdSubCategoryFilterVal ||
        p.thirdSubCatId === thirdSubCategoryFilterVal)
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="w-full py-2 px-5 bg-[#f1faff] border border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5 rounded-md">
        <div className="info">
          <h1 className="text-[30px] font-bold leading-10 mb-3">
            Good Morning,
            <br />
            <span className="flex gap-4">
              Shivraj
              <img src="/waving.png" className="w-[35px] h-full" />
            </span>
          </h1>
          <p>
            Here's What happening on your store today. See the statistic at once
          </p>
          <br />
          <Button
            className="btn-blue"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus className="mr-2" />
            Add Product
          </Button>
        </div>
        <img src="/shop-illustration.png" className="w-[250px]" />
      </div>
      <DashboardBoxes />
    
      <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <div className="flex items-center w-full px-5 pb-5 justify-between">
          <div className="flex items-center gap-4 w-full px-5 pb-5 ">
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
                {[...new Set(productData.map((p) => p.catId))].map(
                  (catId, index) => {
                    const item = productData.find((p) => p.catId === catId);
                    return (
                      <MenuItem key={catId || index} value={catId}>
                        {item?.catName}
                      </MenuItem>
                    );
                  }
                )}
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
                {[...new Set(productData.map((p) => p.subCatId))].map(
                  (subId, index) => {
                    const item = productData.find((p) => p.subCatId === subId);
                    return (
                      <MenuItem key={subId || index} value={subId}>
                        {item?.subCat}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </div>

            {/* Third Level Category Filter */}
            <div className="col1 w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">
                Third Level Category By
              </h4>
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
                {[...new Set(productData.map((p) => p.thirdSubCatId))].map(
                  (thirdId, index) => {
                    const item = productData.find(
                      (p) => p.thirdSubCatId === thirdId
                    );
                    return (
                      <MenuItem key={thirdId || index} value={thirdId}>
                        {item?.thirdSubCat}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </div>

            <div className="w-[10%] mt-6">
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
                <TableCell
                  padding="checkbox"
                  sx={{
                    width: 50,
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <Checkbox
                    size="small"
                    onChange={handleSelectAll}
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((item) => item.checked)
                    }
                    inputProps={{ "aria-label": "Select all products" }}
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
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

                    {/* Restored Image + Name block */}
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
                          <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                            <Link to={`/products/${product?._id || "default"}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <span className="text-[12px] text-gray-500">
                            Brands:&nbsp;
                          </span>
                          <span className="text-[12px]">
                            {product?.brand || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Other Columns */}
                    <TableCell>{product?.catName || "N/A"}</TableCell>
                    <TableCell>{product?.subCat || "N/A"}</TableCell>
                    <TableCell>
                      <span className="line-through text-gray-500">
                        ₹{product.oldPrice || 0}
                      </span>
                      <br />
                      <span className="text-primary">
                        ₹{product?.price || 0}
                      </span>
                    </TableCell>
                    <TableCell>{product.sale || 0} sale</TableCell>
                    <TableCell>
                      <Rating
                        name="half-rating"
                        precision={0.5}
                        value={product?.rating}
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 100, maxWidth: 140 }}
                      align="center"
                    >
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 p-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>

        <div className="relative overflow-x-auto pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderedProduct(0)}
                  >
                    {isOpenedOrderedProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600] whitespace-nowrap">
                    24dw898swd086d8a9869s7
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  <span className="text-primary font-[600]">
                    pay_PTP0qgYVTt90
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  <span className="text-primary font-[600]">
                    pay_PTP0qgYVTt90
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  SHIVRAJ THARU
                </td>
                <td className="px-6 py-4 font-[500]">9845849833</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    H No 222 Street No 6 Adarsha MollaMojhaparpur kathmandu Near
                    Civil Hospital ph. +977-9858558076
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">4546</td>
                <td className="px-6 py-4 font-[500]">3800</td>
                <td className="px-6 py-4 font-[500]">
                  shivrajtharu62@gmail.com
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">
                    662gasu279da98ad98daf89fa798
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  2025-01-04
                </td>
              </tr>
              {isOpenedOrderedProduct === 0 && (
                <>
                  <tr>
                    <td className="pl-20" colSpan={6}>
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Tite
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                SubTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-200">
                              <td className="px-6 py-4 font-[500]">
                                <span className="text-gray-600 whitespace-nowrap">
                                  24dw898swd086d8a9869s7
                                </span>
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                A-Line Kurti With Saharara &Du...
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                <img
                                  src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                  className="w-[40px] h-[40px] rounded-md object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 font-[500]">2</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-20" colSpan={6}>
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Tite
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                SubTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-200">
                              <td className="px-6 py-4 font-[500]">
                                <span className="text-gray-600 whitespace-nowrap">
                                  24dw898swd086d8a9869s7
                                </span>
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                A-Line Kurti With Saharara &Du...
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                <img
                                  src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                  className="w-[40px] h-[40px] rounded-md object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 font-[500]">2</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              )}

              <tr className="bg-white border-b border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderedProduct(1)}
                  >
                    {isOpenedOrderedProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600] whitespace-nowrap">
                    24dw898swd086d8a9869s7
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  <span className="text-primary font-[600]">
                    pay_PTP0qgYVTt90
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  <span className="text-primary font-[600]">
                    pay_PTP0qgYVTt90
                  </span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  SHIVRAJ THARU
                </td>
                <td className="px-6 py-4 font-[500]">9845849833</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    H No 222 Street No 6 Adarsha MollaMojhaparpur kathmandu Near
                    Civil Hospital ph. +977-9858558076
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">4546</td>
                <td className="px-6 py-4 font-[500]">3800</td>
                <td className="px-6 py-4 font-[500]">
                  shivrajtharu62@gmail.com
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">
                    662gasu279da98ad98daf89fa798
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  2025-01-04
                </td>
              </tr>
              {isOpenedOrderedProduct === 1 && (
                <>
                  <tr>
                    <td className="pl-20" colSpan={6}>
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Tite
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                SubTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-200">
                              <td className="px-6 py-4 font-[500]">
                                <span className="text-gray-600 whitespace-nowrap">
                                  24dw898swd086d8a9869s7
                                </span>
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                A-Line Kurti With Saharara &Du...
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                <img
                                  src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                  className="w-[40px] h-[40px] rounded-md object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 font-[500]">2</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-20" colSpan={6}>
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Product Tite
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                SubTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-200">
                              <td className="px-6 py-4 font-[500]">
                                <span className="text-gray-600 whitespace-nowrap">
                                  24dw898swd086d8a9869s7
                                </span>
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                A-Line Kurti With Saharara &Du...
                              </td>
                              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                <img
                                  src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                  className="w-[40px] h-[40px] rounded-md object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 font-[500]">2</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                              <td className="px-6 py-4 font-[500]">1300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 p-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>

        <div className="flex items-center gap-5 px-5 p-5 pt-1">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block h-[8px] w-[8px] bg-green-600 rounded-full"></span>
            Total Users
          </span>

          <span className="flex items-center gap-1 text-[15px]">
            <span className="block h-[8px] w-[8px] bg-primary rounded-full"></span>
            Total Sales
          </span>
        </div>

        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            strokeWidth={3}
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={3}
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
