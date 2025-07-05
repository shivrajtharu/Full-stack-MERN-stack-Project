import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TooltipMui from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";
import EditCategory from "./editCategory";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 100 },
];

const CategoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  useEffect(() => {
    if (!context?.isOpenFullScreenPanel?.open) {
      context.setRefreshToggle((prev) => !prev);
    }
  }, [context?.isOpenFullScreenPanel?.open]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openEditCategory = (categoryId) => {
    context.setIsOpenFullScreenPanel({
      open: true,
      model: "Edit Category",
      id: categoryId,
    });
  };

  const deleteCat = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    try {
      await deleteData(`/api/category/${id}`);
      context.setRefreshToggle((prev) => !prev);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const paginatedData = context.catData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="flex items-center justify-between py-5 pb-0 w-full">
        <h2 className="text-[18px] font-[600]">
          Category List
          <span className="text-[14px] font-[400]"> (Material UI Table)</span>
        </h2>
        <div className="col2 w-[30%] ml-auto flex items-center gap-3 justify-end">
          <Button className="btn btn-sm !bg-green-600 !text-white">
            Export
          </Button>
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white pt-5">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell width={column.minWidth} key={column.id}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableRow key={item._id || index}>
                    
                    <TableCell className="!pr-0 !py-2" width={100}>
                      <div className="flex items-center gap-4 w-[50px]">
                        <div className="img w-full rounded-md overflow-hidden group">
                          <Link to={`/category/list/${item?._id || "default"}`}>
                            <img
                              src={item?.images?.[0] || "/placeholder.jpg"}
                              alt={item?.name || "Category Image"}
                              className="w-full group-hover:scale-105 transition-all"
                            />
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!pr-0 !py-2" width={100}>
                      {item?.name || "N/A"}
                    </TableCell>
                    <TableCell className="!pr-4 !py-2" width={100}>
                      <div className="flex items-center gap-4">
                        <TooltipMui title="Edit Product" placement="top">
                          <Button
                            className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]"
                            onClick={() => openEditCategory(item._id)}
                          >
                            <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </TooltipMui>

                        <TooltipMui title="Remove Product" placement="top">
                          <Button
                            className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)]"
                            onClick={() => deleteCat(item._id)}
                          >
                            <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </TooltipMui>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={context.catData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {context?.isOpenFullScreenPanel?.open &&
        ["Edit Category", "Add New Category"].includes(
          context?.isOpenFullScreenPanel?.model
        ) && (
          <EditCategory
            onCategoryAdded={() => context.setRefreshToggle((prev) => !prev)}
          />
        )}
    </>
  );
};

export default CategoryList;
