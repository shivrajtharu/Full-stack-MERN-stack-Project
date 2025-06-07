import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import Chip from '@mui/material/Chip';

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import TooltipMui from "@mui/material/Tooltip";
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "CATEGORY IMAGE", minWidth: 250 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 250 },
  { id: "SubCatName", label: "Sub CATEGORY NAME", minWidth: 400 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const SubCategoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            Sub Category List
            <span className="text-[14px] font-[400]"> (Material UI Table)</span>
          </h2>
          <div className="col2 w-[30%] ml-auto flex items-center gap-3 justify-end">
            <Button className="btn btn-sm !bg-green-600 !text-white">
              Export
            </Button>
            <Button
              className="btn-blue btn-sm"
              onClick={() =>
                constext.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add New Sub Category",
                })
              }
            >
              Add New Sub Category
            </Button>
          </div>
        </div>

        <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="!px-6 !pr-0" width={60}>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      width={column.minWidth}
                      key={column.id}
                      align={column.align}
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
                    
                  >
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell
                    className="!pr-0 !py-2"
                    width={100}
                  >
                    <div className="flex items-center gap-4 w-[80px]">
                      <div className="img w-full rounded-md overflow-hidden group">
                        <Link to={"/product/2343"}>
                          <img
                            src="https://api.spicezgold.com/download/file_1734525204708_fash.png"
                            className="w-full group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Chip label="Fashion" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                       <Chip label="Men" color="primary" />
                       <Chip label="Women" color="primary" />
                       <Chip label="Kids" color="primary" />
                    </div>
                  </TableCell>
                  <TableCell
                    className="!pr-4 !py-2"
                    width={100}
                  >
                    <div className="flex items-center gap-4">
                      <TooltipMui title="Edit Product" placement="top">
                        <Button className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
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

export default SubCategoryList;
