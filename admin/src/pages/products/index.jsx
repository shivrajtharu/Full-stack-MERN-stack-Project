import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../../components/progressBar";
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
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 120,
  },
];

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [categoryFilterVal, setcategoryFilterVal] = useState("");

  const handleChangeCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const constext = useContext(MyContext);

  return (
    <>
      <div className="flex-col w-[82%] px-5 py-0 mt-3">
        <div className="flex items-center justify-between py-5 pb-0 w-full ">
          <h2 className="text-[18px] font-[600]">
            Products
            <span className="text-[14px] font-[400]">(Material UI Table)</span>
          </h2>
          <div className="col2 w-[25%] ml-auto flex items-center gap-3 justify-end">
            <Button className="btn btn-sm !bg-green-600 !text-white">
              Export
            </Button>
            <Button className="btn-blue btn-sm" onClick={() => constext.setIsOpenFullScreenPanel({
              open: true,
              model: "Add Product"
            })}>Add Product</Button>
          </div>
        </div>

        <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
          <div className="flex items-center w-full px-5 pb-5 justify-between">
            <div className="col1 w-[20%]">    
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
                className="w-full"
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoryFilterVal}
                onChange={handleChangeCatFilter}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>

            <div className="col2 w-[20%]">
              <SearchBox />
            </div>

          </div>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="!px-6 !pr-0">
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                      <div className="info w-[75%]">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          <Link to={"/product/2343"}>
                            EYEBOGLER Teal Tshirts/Men tshirt/ tshirt for men/
                            tshirt mens Regular
                          </Link>
                        </h3>
                        <span className="text-[12px]">Books</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Electronics
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    Women
                  </TableCell>
                  <TableCell
                    className="!px-5 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="!px-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={60} status={"success"} />
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    style={{ minWidth: columns.minWidth }}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="View Product Detail" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>

                      <TooltipMui title="Remove Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </TooltipMui>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
