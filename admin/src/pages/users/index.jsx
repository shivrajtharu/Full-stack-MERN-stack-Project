import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBox from "../../components/searchBox";
import { MyContext } from "../../App";
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  { id: "userEmail", label: "USER EMAIL", minWidth: 150 },
  {
    id: "userPh",
    label: "USER PHONE NO.",
    minWidth: 130,
  },
  {
    id: "createdAt",
    label: "CREATED AT",
    minWidth: 130,
  },
];

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const context = useContext(MyContext);

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <div className="flex items-center w-full px-5 pb-5 justify-between">
          <h2 className="text-[18px] font-[600]">
            Users List
            <span className="text-[14px] font-[400]"> (Material UI Table)</span>
          </h2>

          <div className="col2 w-[40%]">
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
                  <div className="flex items-center w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/2343"}>
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  Ram Tharu
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead />
                    ramtharu52@gmail.com
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +977-9867654321
                  </span>
                </TableCell>
                <TableCell
                  className="!px-5 !py-2"
                  style={{ minWidth: columns.minWidth }}
                >
                  <span className="flex items-center gap-2">
                    <SlCalender /> 10-25-2025
                  </span>
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
    </>
  );
};

export default Users;
