import { Button, MenuItem, Select } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

const AddSubCategory = () => {
    const [category, setCategory] = useState("");
     const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };

    const [subCategory, setSubCategory] = useState("");
     const handleChangeSubCat = (event) => {
    setSubCategory(event.target.value);
  };


  return (
    <>
      <section className="p-5 bg-gray-50">
        <form className="form p-8 py-3">
          <div className="grid grid-cols-4 pb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="categoryDrop"
                className="w-full"
                size="small"
                value={category}
                label="Category"
                onChange={handleChangeCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Electronics</MenuItem>
                <MenuItem value={30}>Bags</MenuItem>
                <MenuItem value={30}>Footwear</MenuItem>
                <MenuItem value={30}>Groceries</MenuItem>
                <MenuItem value={30}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
                <MenuItem value={30}>Jwellery</MenuItem>
              </Select>
            </div>
          
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="subCategoryDrop"
                className="w-full"
                size="small"
                value={subCategory}
                label="SubCategory"
                onChange={handleChangeSubCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>
          </div>
          <br />
          <div className="w-[250px]">
            <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddSubCategory;
