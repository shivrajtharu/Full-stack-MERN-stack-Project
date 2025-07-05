import { Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
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
import EditHomeSLide from "./editHomeSlide";
import AddHomeSlide from "./addHomeSlide";
import { fetchDataFromApi, deleteData } from "../../utils/api";

const columns = [
  { id: "image", label: "Image", minWidth: 250 },
  { id: "action", label: "Action", minWidth: 100 },
];

const HomeSliderBanners = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slideData, setSlideData] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    if (!context?.isOpenFullScreenPanel?.open) {
      setRefreshToggle((prev) => !prev);
    }
  }, [context?.isOpenFullScreenPanel?.open]);

  useEffect(() => {
    const fetchHomeSliders = async () => {
      try {
        const res = await fetchDataFromApi("/api/homeSlide/");
        setSlideData(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch homeSlides:", error);
      }
    };
    fetchHomeSliders();
  }, [refreshToggle]);

  const openEditHomeSlide = (id) => {
    context.setIsOpenFullScreenPanel({
      open: true,
      model: "Edit HomeSlide",
      id,
    });
  };

  const deleteSlide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this homeSlide?")) return;
    try {
      await deleteData(`/api/homeSlide/${id}`);
      setRefreshToggle((prev) => !prev);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const paginatedData = slideData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Home Banner Slide List
          <span className="ml-2 text-sm font-normal text-gray-500">(Material UI Table)</span>
        </h2>
        <div className="flex gap-3">
          <Button variant="contained" className="!bg-green-600 !text-white">Export</Button>
          <Button
            variant="contained"
            className="!bg-blue-600 !text-white"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Home Slide",
              })
            }
          >
            Add Home Slide
          </Button>
        </div>
      </div>

      {/* Table */}
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
                paginatedData.map((item) => (
                 <TableRow key={item._id || index}>
                      <TableCell className="!pr-0 !py-2" width={300}>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-full rounded-md overflow-hidden group">
                            <Link to={"/product/2343"}>
                              <img
                                src={item?.images?.[0] || "/placeholder.jpg"}
                                alt={item?.name || "HomeSlider Image"}
                                className="w-full group-hover:scale-105 transition-all"
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="!pr-4 !py-2" width={100}>
                        <div className="flex items-center gap-4">
                          <TooltipMui title="Edit Product" placement="top">
                            <Button
                              className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]"
                              onClick={() => openEditHomeSlide(item._id)}
                            >
                              <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </TooltipMui>

                          <TooltipMui title="Remove Product" placement="top">
                            <Button
                              className="!h-[35px] !w-[35px] !min-w-[35px] !bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.1)] !text-[rgba(0,0,0,0.3)]"
                              onClick={() => deleteSlide(item._id)}
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
                  <TableCell colSpan={2} align="center">
                    No Home Sliders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={slideData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </div>

      {/* Modals */}
      {context?.isOpenFullScreenPanel?.open &&
        context?.isOpenFullScreenPanel?.model === "Edit HomeSlide" && (
          <EditHomeSLide onHomeSlideAdded={() => setRefreshToggle((prev) => !prev)} />
        )}
      {context?.isOpenFullScreenPanel?.open &&
        context?.isOpenFullScreenPanel?.model === "Add Home Slide" && (
          <AddHomeSlide onHomeSlideAdded={() => setRefreshToggle((prev) => !prev)} />
        )}
    </div>
  );
};

export default HomeSliderBanners;
