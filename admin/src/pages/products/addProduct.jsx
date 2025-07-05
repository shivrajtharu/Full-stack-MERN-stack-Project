import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import UploadBox from "../../components/uploadBox";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const [productRams, setProductRams] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedSwitch, setCheckedSwitch] = useState(false);

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdSubCat: "",
    thirdSubCatId: "",
    countInStock: "",
    rating: 1,
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
    bannerImages: [],
    bannerTitleName: "",
    isDisplayOnHomeBanner: false,
  });

  const setPreviewsFun = (update) => {
    setFormFields((prev) => ({
      ...prev,
      images: typeof update === "function" ? update(prev.images) : update,
    }));
  };

  const setBannerPreviewsFun = (update) => {
    setFormFields((prev) => ({
      ...prev,
      bannerImages:
        typeof update === "function" ? update(prev.bannerImages) : update,
    }));
  };

  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setFormFields((prev) => ({
      ...prev,
      catId: value,
      category: value,
    }));
  };

  const selectCatByName = (name) => {
    setFormFields((prev) => ({ ...prev, catName: name }));
  };

  const handleChangeProductSubCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setFormFields((prev) => ({ ...prev, subCatId: value }));
  };

  const selectSubCatByName = (name) => {
    setFormFields((prev) => ({ ...prev, subCat: name }));
  };

  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    setProductThirdLevelCat(value);
    setFormFields((prev) => ({ ...prev, thirdSubCatId: value }));
  };

  const SelectThirdCatByName = (name) => {
    setFormFields((prev) => ({ ...prev, thirdSubCat: name }));
  };

  const handleChangeProductFeatured = (event) => {
    const value = event.target.value === "true" || event.target.value === true;
    setProductFeatured(value);
    setFormFields((prev) => ({ ...prev, isFeatured: value }));
  };

  const handleChangeProductRams = (event) => {
    const { value } = event.target;
    const rams = typeof value === "string" ? value.split(",") : value;
    setProductRams(rams);
    setFormFields((prev) => ({ ...prev, productRam: rams }));
  };

  const handleChangeProductWeight = (event) => {
    const { value } = event.target;
    const weights = typeof value === "string" ? value.split(",") : value;
    setProductWeight(weights);
    setFormFields((prev) => ({ ...prev, productWeight: weights }));
  };

  const handleChangeProductSize = (event) => {
    const { value } = event.target;
    const sizes = typeof value === "string" ? value.split(",") : value;
    setProductSize(sizes);
    setFormFields((prev) => ({ ...prev, size: sizes }));
  };

  const handleChangeSwitch = (event) => {
    setCheckedSwitch(event.target.checked)
    formFields.isDisplayOnHomeBanner = event.target.checked
  }

  const OnChangeRating = (e, value) => {
    setFormFields((prev) => ({ ...prev, rating: value }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name.trim()) {
      context.notify("Please enter product name", "error");
      setIsLoading(false);
      return;
    }
    if (!formFields.description) {
      context.notify("Please enter product description", "error");
      setIsLoading(false);
      return;
    }
    if (!formFields.price) {
      context.notify("Please enter product price", "error");
      setIsLoading(false);
      return;
    }

    if (!formFields.countInStock) {
      context.notify("Please enter product Stock", "error");
      setIsLoading(false);
      return;
    }
    if (formFields.images.length === 0) {
      context.notify("Please upload product images", "error");
      setIsLoading(false);
      return;
    }

    const payload = {
      ...formFields,
      name: formFields.name.trim(),
    };

    try {
      const res = await postData("/api/product/create-product", payload);

      if (res?.success) {
        const resetFields = {
          name: "",
          description: "",
          images: [],
          brand: "",
          price: "",
          oldPrice: "",
          category: "",
          catName: "",
          catId: "",
          subCatId: "",
          subCat: "",
          thirdSubCat: "",
          thirdSubCatId: "",
          countInStock: "",
          rating: 1,
          isFeatured: false,
          discount: "",
          productRam: [],
          size: [],
          productWeight: [],
        };

        setFormFields(resetFields);
        setProductCat("");
        setProductSubCat("");
        setProductThirdLevelCat("");
        setProductFeatured(false);
        setProductRams([]);
        setProductSize([]);
        setProductWeight([]);

        context.notify(
          res?.message || "Product created successfully",
          "success"
        );
        context.setIsOpenFullScreenPanel?.({ open: false });
        navigate("/products");
      } else {
        context.notify(res?.message || "Failed to create product", "error");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      context.notify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/api/product/productRams").then((res) => {
      setProductRamsData(res?.data);
    });

    fetchDataFromApi("/api/product/productWeight").then((res) => {
      setProductWeightData(res?.data);
    });

    fetchDataFromApi("/api/product/productSize").then((res) => {
      setProductSizeData(res?.data);
    });
  }, []);

  return (
    <section className="p-5 bg-gray-50">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 pb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 pb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Description
              </h3>
              <textarea
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="product-cat-label"
                  id="productCatDrop"
                  className="w-full"
                  size="small"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat) => (
                    <MenuItem
                      key={cat._id}
                      value={cat._id}
                      onClick={() => selectCatByName(cat.name)}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Sub Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="product-subCat-label"
                  id="productSubCatDrop"
                  className="w-full"
                  size="small"
                  value={productSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData?.map(
                    (cat) =>
                      cat.children?.length !== 0 &&
                      cat.children.map((subCat) => (
                        <MenuItem
                          key={subCat._id}
                          value={subCat._id}
                          onClick={() => selectSubCatByName(subCat.name)}
                        >
                          {subCat.name}
                        </MenuItem>
                      ))
                  )}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Third Level Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="product-thirdCat-label"
                  id="productThirdLevelCatDrop"
                  className="w-full"
                  size="small"
                  value={productThirdLevelCat}
                  label="Third Level Category"
                  onChange={handleChangeProductThirdLevelCat}
                >
                  {context?.catData?.map(
                    (cat) =>
                      cat.children?.length !== 0 &&
                      cat.children.map(
                        (subCat) =>
                          subCat.children?.length !== 0 &&
                          subCat.children.map((thirdLevelCat) => (
                            <MenuItem
                              key={thirdLevelCat._id}
                              value={thirdLevelCat._id}
                              onClick={() =>
                                SelectThirdCatByName(thirdLevelCat.name)
                              }
                            >
                              {thirdLevelCat.name}
                            </MenuItem>
                          ))
                      )
                  )}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Is Featured?
              </h3>
              <Select
                labelId="product-featured-label"
                id="productFeature"
                className="w-full"
                size="small"
                value={productFeatured}
                label="Feature"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 pb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product RAMS
              </h3>
              {productRamsData?.length !== 0 && (
                <Select
                  multiple
                  labelId="product-ram-label"
                  id="productRam"
                  className="w-full"
                  size="small"
                  value={productRams}
                  label="RAM"
                  onChange={handleChangeProductRams}
                >
                  {productRamsData?.map((item, index) => {
                    return (
                      <MenuItem key={item._id || index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Weight
              </h3>
              {productWeightData?.length !== 0 && (
                <Select
                  multiple
                  labelId="product-weight-label"
                  id="productWeight"
                  className="w-full"
                  size="small"
                  value={productWeight}
                  label="Weight"
                  onChange={handleChangeProductWeight}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem key={item._id || index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Size
              </h3>
              {productSizeData?.length !== 0 && (
                <Select
                  multiple
                  labelId="product-size-label"
                  id="productSize"
                  className="w-full"
                  size="small"
                  value={productSize}
                  label="Size"
                  onChange={handleChangeProductSize}
                >
                  {productSizeData?.map((item, index) => {
                    return (
                      <MenuItem key={item._id || index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Rating
              </h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                value={formFields.rating}
                onChange={OnChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0 ">
            <h3 className="text-[18px] font-[700] mb-3">Media & Images</h3>

            <UploadBox
              url="/api/product/uploadImages"
              multiple={true}
              previews={formFields.images}
              setPreviewsFun={setPreviewsFun}
            />
          </div>

          <div className="col w-full p-5 px-0 ">
            <div className="bg-white shadow-md p-4 w-full">
              <div className="flex items-center gap-10">
                <h3 className="text-[18px] font-[700] mb-3">Banner Images</h3>
                <Switch
                  {...label}
                  onChange={handleChangeSwitch}
                  checked={checkedSwitch}
                />
              </div>
              <UploadBox
                url="/api/product/uploadBannerImages"
                multiple={true}
                previews={formFields.bannerImages}
                setPreviewsFun={setBannerPreviewsFun}
              />

              <br />
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Banner Title
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none p-3 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="bannerTitleName"
                value={formFields.bannerTitleName}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>

        <hr />
        <br />

        <Button
          type="submit"
          disabled={isLoading}
          className="btn-blue btn-lg w-full flex gap-2"
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <>
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
