import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import CategoryModel from "../models/category.model.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CategoryController {
  uploadImages = async (req, res, next) => {
    try {
      const image = req.files;
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      let uploadedImages = [];
      for (let i = 0; i < image?.length; i++) {
        const result = await cloudinary.uploader.upload(
          image[i].path,
          options
        );
        uploadedImages.push(result.secure_url);
        // Use the actual file path from multer (image[i].path) for deletion
        const filePath = image[i].path;
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          // Log the error but don't crash the app
          console.error(`Failed to delete file ${filePath}:`, err);
        }
      }

      return res.json({
        success: true,
        error: false,
        images: uploadedImages
      })

    } catch (exception) {
      next(exception);
    }
  };

  createCategory = async (req, res, next) => {
    try {
      // Expect images to be sent in req.body.images as an array
      let images = req.body.images;
      if (typeof images === "string") {
        // If sent as a single string, wrap in array
        images = [images];
      }
      let category = new CategoryModel({
        name: req.body.name,
        images: images || [],
        parentId: req.body.parentId,
        parentCatName: req.body.parentCatName,
      });

      if (!category) {
        return res.status(500).json({
          error: true,
          success: false,
          message: "Category not created",
          status: "CATEGORY_NOT_CREATED",
        });
      }

      category = await category.save();

      return res.json({
        success: true,
        error: false,
        message: "Category created successfully",
        status: "CATEGORY_CREATED",
        category: category
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllCategories = async (req, res, next) => {
    try {
      const categories = await CategoryModel.find();

      const categoryMap = {};
      categories.forEach((cat) => {
        categoryMap[cat._id] = { ...cat._doc, children: [] };
      });

      const rootCategories = [];
      categories.forEach((cat) => {
        if (cat.parentId) {
          if (categoryMap[cat.parentId]) {
            categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
          }
        } else {
          rootCategories.push(categoryMap[cat._id]);
        }
      });

      return res.json({
        message: "Categories fetched successfully",
        status: "CATEGORY_FETCHED",
        data: {
          categories: rootCategories,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getCategoriesCounts = async (req, res, next) => {
    try {
      const categoryCount = await CategoryModel.countDocuments({
        parentId: undefined,
      });

      if (!categoryCount) {
        return res.status(404).json({
          code: 404,
          message: "No Category found",
          status: "PRODUCT_NOT_FOUND",
        });
      }

      return res.json({
        message: "Success",
        status: "Ok",
        CategoryCount: categoryCount,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getSubCategoriesCounts = async (req, res, next) => {
    try {
      const categories = await CategoryModel.find();

      if (!categories) {
        return res.status(404).json({
          code: 404,
          message: "Category does not exist",
          status: "Not Found",
        });
      } else {
        const subCatList = [];
        for (let cat of categories) {
          if (cat.parentId !== undefined) {
            subCatList.push(cat);
          }
        }
        return res.json({
          message: "success",
          status: "Ok",
          subCategoryCount: subCatList.length,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };

  detailById = async (req, res, next) => {
    try {
      const category = await CategoryModel.findById(req.params.id);

      if (!category) {
        return res.status(500).json({
          code: 500,
          message: "Category with the given id was not found.",
          status: "CATEGORY_NOT_FOUND",
        });
      }

      return res.json({
        category: category,
        message: "Success",
        status: "Ok",
      });
    } catch (exception) {
      next(exception);
    }
  };

  // delete category by Id and subCategories inside this category
  deleteCategory = async (req, res, next) => {
    try {
      const category = await CategoryModel.findById(req.params.id);

      if (!category) {
        return res.status(404).json({
          code: 404,
          message: "Category not found",
          status: "NOT_FOUND",
        });
      }

      const images = category.images;

      for (let img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const imageName = urlArr[urlArr.length - 1].split(".")[0];

        if (imageName) {
          await cloudinary.uploader.destroy(imageName);
        }
      }

      const subCategory = await CategoryModel.find({
        parentId: req.params.id,
      });

      for (let i = 0; i < subCategory.length; i++) {
        const thirdSubCategory = await CategoryModel.find({
          parentId: subCategory[i]._id,
        });

        for (let j = 0; j < thirdSubCategory.length; j++) {
          await CategoryModel.findByIdAndDelete(thirdSubCategory[j]._id);
        }

        await CategoryModel.findByIdAndDelete(subCategory[i]._id);
      }

      const deleteCategory = await CategoryModel.findByIdAndDelete(
        req.params.id
      );

      if (!deleteCategory) {
        return res.status(422).json({
          code: 422,
          message: "Category can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        message: "Category Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      const oldCategory = await CategoryModel.findById(req.params.id);

      if (!oldCategory) {
        return res.status(404).json({
          code: 404,
          message: "Category not found",
          status: "NOT_FOUND",
        });
      }

      let updatedImages = oldCategory.images; // Start with old images

      // If new files are uploaded
      if (req.files && req.files.length > 0) {
        // Delete old images from Cloudinary
        for (let imgUrl of oldCategory.images) {
          const publicId = imgUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        // Upload new images
        updatedImages = [];
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        };

        for (let i = 0; i < req.files.length; i++) {
          const result = await cloudinary.uploader.upload(
            req.files[i].path,
            options
          );
          updatedImages.push(result.secure_url);
          fs.unlinkSync(req.files[i].path); // Clean up local files
        }
      }

      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          images: updatedImages,
          parentId: req.body.parentId,
          parentCatName: req.body.parentCatName,
        },
        {
          new: true,
        }
      );

      if (!updatedCategory) {
        return res.status(422).json({
          code: 422,
          message: "Category cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        message: "Category Updated Successfully",
        status: "UPDATED",
        category: updatedCategory,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const categoryCtrl = new CategoryController();
export default categoryCtrl;
