import { Button } from "@mui/material";
import DashboardBoxes from "../../components/dashboardBoxes";
import { FaPlus } from "react-icons/fa6";
import { useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../components/progressBar";
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
import Pagination from "@mui/material/Pagination";
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

const Dashboard = () => {
  const [isOpenedOrderedProduct, setIsOpenedOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenedOrderedProduct === index) {
      setIsOpenedOrderedProduct(null);
    } else {
      setIsOpenedOrderedProduct(index);
    }
  };

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

  const [chart1Data, setChart1Data] = useState(data);

  const context = useContext(MyContext)

  return (
    <>
      <div
        className={`contentRight py-4 px-5 ${
          context.isSideBarOpen === false ? "w-[100%]" : "w-[82%]"
        } transition-all`}
      >
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
              Here's What happening on your store today. See the statistic at
              once
            </p>
            <br />
            <Button className="btn-blue"  onClick={() => context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product"
                  })}>
              <FaPlus className="mr-2" />
              Add Product
            </Button>
          </div>
          <img src="/shop-illustration.png" className="w-[250px]" />
        </div>
        <DashboardBoxes />

        <div className="card my-5 shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center justify-between px-5 p-5">
            <h2 className="text-[18px] font-[600]">
              Products{" "}
              <span className="text-[14px] font-[400]">
                (Tailwind Css Table)
              </span>
            </h2>
          </div>

          <div className="flex items-center w-full pl-5 pb-5 pr-5">
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

            <div className="col2 w-[25%] ml-auto flex items-center gap-3">
              <Button className="btn btn-sm !bg-green-600 !text-white">
                Export
              </Button>
              <Button className="btn-blue btn-sm"  onClick={() => context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product"
                  })}>Add Product</Button>
            </div>
          </div>

          <div className="relative overflow-x-auto pb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 pr-0 py-3" width="10%">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </th>
                  <th scope="col" className="px-0 py-3 whitespace-nowrap">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Sub Category
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 pr-0 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td>

                  <td className="px-0 py-2">
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
                  </td>

                  <td className="px-6 py-2">Electronics</td>
                  <td className="px-6 py-2">Women</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="old price line-through text-gray-500 text-[14px] font-[500]">
                        $58.00
                      </span>
                      <span className="old price text-primary text-[14px] font-semibold">
                        $58.00
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-[14px] w-[100px]">
                      <span className="font-[600]">234 </span>sale{" "}
                    </p>
                    <Progress value={30} status={"warning"} />
                  </td>
                  <td className="px-6 py-2">
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end pt-5 pb-5 px-4">
            <Pagination count={10} color="primary" />
          </div>
        </div>

        <div className="card my-5 shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center justify-between px-5 p-5">
            <h2 className="text-[18px] font-[600]">
              Products{" "}
              <span className="text-[14px] font-[400]">
                (Material UI Table)
              </span>
            </h2>
          </div>

          <div className="flex items-center w-full pl-5 pb-5 pr-5">
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

            <div className="col2 w-[25%] ml-auto flex items-center gap-3">
              <Button className="btn btn-sm !bg-green-600 !text-white">
                Export
              </Button>
              <Button className="btn-blue btn-sm"  onClick={() => context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product"
                  })}>Add Product</Button>
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
                <TableRow>
                  <TableCell
                    className="!px-6 !pr-0"
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
                      H No 222 Street No 6 Adarsha MollaMojhaparpur kathmandu
                      Near Civil Hospital ph. +977-9858558076
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
                      H No 222 Street No 6 Adarsha MollaMojhaparpur kathmandu
                      Near Civil Hospital ph. +977-9858558076
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
            <h2 className="text-[18px] font-[600]">
              Total Users & Total Sales
            </h2>
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
      </div>
    </>
  );
};

export default Dashboard;
