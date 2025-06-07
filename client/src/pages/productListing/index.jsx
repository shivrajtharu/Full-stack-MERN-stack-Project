import SideBar from "../../components/sideBar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/productItem";
import { Button } from "@mui/material";
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ProductItemListView from "../../components/productItemListView";
import Pagination from '@mui/material/Pagination';


const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="py-5 pb-0">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Fashion
            </Link>
          </Breadcrumbs>
        </div>
        <div className="bg-white p-2 mt-5">
          <div className="container flex gap-3">
            <div className="sideBarWrapper w-[20%] h-full bg-white p-3">
              <SideBar />
            </div>
            <div className="rightContent w-[80%] py-3">
              <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between">
                <div className="col1 flex items-center itemViewActions">
                  <Button
                    className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] 
                    ${itemView === 'list' && 'active'}`}
                    onClick={() => setItemView("list")}
                  >
                    <FaList className="!text-[rgba(0,0,0,0.9)] " />
                  </Button>
                  <Button
                    className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] 
                    ${itemView === 'grid' && 'active'}`}
                    onClick={() => setItemView("grid")}
                  >
                    <IoGridSharp className="!text-[rgba(0,0,0,0.7)]" />
                  </Button>
                  <span className="tex-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                    There are 27 Products.
                  </span>
                </div>
                <div className="col2 ml-auto flex items-center justify-end gap-2 pr-4">
                  <span className="tex-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                    Sort By:
                  </span>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="!bg-white !text-[13px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    Sales, highest to lowest
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      className="!text-[13px] !text-[#000] !capitalize"
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="!text-[13px] !text-[#000] !capitalize"
                    >
                      Name, A to Z
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="!text-[13px] !text-[#000] !capitalize"
                    >
                      Name, Z to A
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="!text-[13px] !text-[#000] !capitalize"
                    >
                      Price, low to high
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="!text-[13px] !text-[#000] !capitalize"
                    >
                      Price, high to low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className={`grid ${itemView === 'grid' ? 'grid-cols-4 md:grid-cols-4 ' : 'grid-cols-1 md:grid-cols-1 '}gap-4 mt-2`}>
                {itemView === "grid" ? (
                  <>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                  </>
                ) : (
                  <>
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                  </>
                )}
              </div>
              <div className="flex items-center justify-center mt-10"><Pagination count={10} showFirstButton showLastButton /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
