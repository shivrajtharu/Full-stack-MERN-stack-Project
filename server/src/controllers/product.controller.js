import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ProductModel from "../models/product.model.js";
import ProductRamModel from "../models/productRam.model.js";
import ProductWeightModel from "../models/productWeight.model.js";
import ProductSizeModel from "../models/productSize.model.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProductController {
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
        const result = await cloudinary.uploader.upload(image[i].path, options);
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
        images: uploadedImages,
      });
    } catch (exception) {
      next(exception);
    }
  };

  uploadBannerImages = async (req, res, next) => {
    try {
      const image = req.files;
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      let bannerImages = [];
      for (let i = 0; i < image?.length; i++) {
        const result = await cloudinary.uploader.upload(image[i].path, options);
        bannerImages.push(result.secure_url);

        // Delete local file
        const filePath = image[i].path;
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.error(`Failed to delete file ${filePath}:`, err);
        }
      }

      return res.status(200).json({
        success: true,
        error: false,
        images: bannerImages,
        message: "Banner images uploaded successfully",
      });
    } catch (exception) {
      next(exception);
    }
  };

  // remove image from cloudinary
  removeImage = async (req, res, next) => {
    try {
      const imgUrl = req.query.img;

      if (!imgUrl) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Image URL is required.",
        });
      }

      const uploadIndex = imgUrl.indexOf("/upload/");
      if (uploadIndex === -1) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Invalid Cloudinary URL format.",
        });
      }

      // Get the part after /upload/
      let publicIdWithExtension = imgUrl.substring(uploadIndex + 8); // +8 to skip "/upload/"
      // Remove versioning like "v1234567890"
      publicIdWithExtension = publicIdWithExtension.replace(/v\d+\//, "");

      // Remove all extensions (.jpg, .webp, .png, etc.)
      const publicId = publicIdWithExtension.replace(
        /\.(webp|jpg|jpeg|png)+$/i,
        ""
      );

      console.log("Deleting Cloudinary public_id:", publicId);

      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === "ok" || result.result === "not found") {
        return res.json({
          success: true,
          error: false,
          message: "Image removed successfully or already deleted.",
          status: "IMAGE_REMOVED",
        });
      } else {
        return res.status(500).json({
          success: false,
          error: true,
          message: "Failed to remove image from Cloudinary.",
          status: "IMAGE_REMOVE_FAILED",
        });
      }
    } catch (error) {
      console.error("Cloudinary Delete Error:", error);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Internal server error while deleting image.",
      });
    }
  };

  createProduct = async (req, res, next) => {
    try {
      // Expect images to be sent in req.body.images as an array
      let images = req.body.images;
      if (typeof images === "string") {
        // If sent as a single string, wrap in array
        images = [images];
      }
      let product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        images: images || [],
        bannerImages: req.body.bannerImages,
        bannerTitleName: req.body.bannerTitleName,
        isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        catName: req.body.catName,
        category: req.body.category,
        catId: req.body.catId,
        subCatId: req.body.subCatId,
        subCat: req.body.subCat,
        thirdSubCat: req.body.thirdSubCat,
        thirdSubCatId: req.body.thirdSubCatId,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productRam: req.body.productRam,
        size: req.body.size,
        productWeight: req.body.productWeight,
      });

      product = await product.save();

      if (!product) {
        return res.status(500).json({
          error: true,
          success: false,
          message: "Failed to Create Product",
          status: "PRODUCT_NOT_CREATED",
        });
      }

      return res.json({
        success: true,
        error: false,
        message: "Product created successfully",
        status: "PRODUCT_CREATED",
        product: product,
      });
    } catch (exception) {
      next(exception);
    }
  };

  createProductRam = async (req, res, next) => {
    try {
      let productRam = new ProductRamModel({
        name: req.body.name,
      });

      productRam = await productRam.save();
      if (!productRam) {
        res.status(500).json({
          error: true,
          success: false,
          message: "Product Rams Not Created",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Rams Created Successfully",
        product: productRam,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProduct = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find()
        .populate("category")
        .sort({ createdAt: -1 }) // Sort by latest
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          error: true,
          success: false,
          code: 422,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        data: products,
        totalCount: totalPosts,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductRams = async (req, res, next) => {
    try {
      const productRams = await ProductRamModel.find();

      return res.json({
        error: false,
        success: true,
        message: "Product RAMs fetched successfully",
        status: "PRODUCTS_FETCHED",
        data: productRams,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listProductRamById = async (req, res, next) => {
    try {
      const RamId = req.params.id;
      const productRam = await ProductRamModel.findById(RamId);

      if (!productRam) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Ram Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Ram fetched Successfully",
        status: "PRODUCT_FETCHED",
        data: productRam,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByCatId = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const filter = { catId: req.params.id };

      const totalPosts = await ProductModel.countDocuments(filter);
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages && totalPages !== 0) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find(filter)
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products || products.length === 0) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "No products found for this category",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Products fetched successfully",
        status: "PRODUCT_FETCHED",
        products,
        totalPages,
        page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByCatName = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find({ catName: req.query.catName })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: products,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductBySubCatId = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find({ subCatId: req.params.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: products,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductBySubCatName = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find({ subCat: req.query.subCat })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: products,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByThirdSubCatId = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find({ thirdSubCatId: req.params.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: products,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByThirdSubCatName = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const products = await ProductModel.find({
        thirdSubCat: req.query.thirdSubCat,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: products,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByPrice = async (req, res, next) => {
    try {
      const filter = {};
      if (req.query.catId) {
        filter.catId = req.query.catId;
      }
      if (req.query.subCatId) {
        filter.subCatId = req.query.subCatId;
      }
      if (req.query.thirdSubCatId) {
        filter.thirdSubCatId = req.query.thirdSubCatId;
      }
      if (req.query.minPrice) {
        filter.price = { ...filter.price, $gte: parseInt(req.query.minPrice) };
      }
      if (req.query.maxPrice) {
        filter.price = { ...filter.price, $lte: parseInt(req.query.maxPrice) };
      }

      const filteredProducts = await ProductModel.find(filter).populate(
        "category"
      );

      return res.json({
        error: false,
        success: true,
        message: "Products filtered by price",
        products: filteredProducts,
        totalPages: 0,
        page: 0,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByRating = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const filter = {};
      if (req.query.catId) {
        filter.catId = req.query.catId;
      }
      if (req.query.subCatId) {
        filter.subCatId = req.query.subCatId;
      }
      if (req.query.thirdSubCatId) {
        filter.thirdSubCatId = req.query.thirdSubCatId;
      }
      if (req.query.rating) {
        filter.rating = req.query.rating;
      }

      const filteredProducts = await ProductModel.find(filter)
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!filteredProducts || filteredProducts.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Product Doe snot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: filteredProducts,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getProductCounts = async (req, res, json) => {
    try {
      const productsCount = await ProductModel.countDocuments();

      if (!productsCount) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "No products found",
          status: "PRODUCT_NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product count fetched successfully",
        status: "PRODUCT_COUNT_FETCHED",
        count: productsCount,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllFeaturedProducts = async (req, res, next) => {
    try {
      const products = await ProductModel.find({
        isFeatured: true,
      }).populate("category");

      if (!products) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        data: products,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Product not found",
          status: "NOT_FOUND",
        });
      }

      const images = product.images;

      for (let img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const imageName = urlArr[urlArr.length - 1].split(".")[0];

        if (imageName) {
          await cloudinary.uploader.destroy(imageName);
        }
      }

      const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);

      if (!deleteProduct) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProductRam = async (req, res, next) => {
    try {
      const productRams = await ProductRamModel.findById(req.params.id);

      if (!productRams) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Product Rams not found",
          status: "NOT_FOUND",
        });
      }

      const deleteProductRams = await ProductRamModel.findByIdAndDelete(
        req.params.id
      );

      if (!deleteProductRams) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Rams can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Rams Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  // delete multiple Products
  deleteMultipleProduct = async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "Invalid input: 'ids' must be a non-empty array.",
        });
      }

      const products = await ProductModel.find({ _id: { $in: ids } });

      if (!products || products.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No products found for the provided IDs.",
        });
      }

      const deleteImagePromises = [];

      products.forEach((product) => {
        (product.images || []).forEach((imgUrl) => {
          const uploadIndex = imgUrl.indexOf("/upload/");
          if (uploadIndex === -1) {
            console.warn("Invalid image URL, skipping:", imgUrl);
            return;
          }

          let publicIdWithVersionAndExt = imgUrl.substring(uploadIndex + 8);
          publicIdWithVersionAndExt = publicIdWithVersionAndExt.replace(
            /v\d+\//,
            ""
          );
          const publicId = publicIdWithVersionAndExt.replace(
            /\.[a-zA-Z0-9]+$/,
            ""
          );

          if (publicId) {
            console.log("Queueing Cloudinary delete for:", publicId);
            deleteImagePromises.push(cloudinary.uploader.destroy(publicId));
          } else {
            console.warn("Failed to extract publicId from:", imgUrl);
          }
        });
      });

      // Wait for all images to be deleted
      const results = await Promise.all(deleteImagePromises);
      console.log("Cloudinary deletion results:", results);

      // Delete products from DB
      await ProductModel.deleteMany({ _id: { $in: ids } });

      return res.json({
        success: true,
        error: false,
        message: "Products deleted successfully.",
      });
    } catch (exception) {
      console.error("deleteMultipleProduct error:", exception);
      next(exception);
    }
  };

  deleteMultipleProductRams = async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "Invalid input: 'ids' must be a non-empty array.",
        });
      }

      const productsRams = await ProductRamModel.find({ _id: { $in: ids } });

      if (!productsRams || productsRams.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No product Rams found for the provided IDs.",
        });
      }

      // Delete productsRams from DB
      await ProductRamModel.deleteMany({ _id: { $in: ids } });

      return res.json({
        success: true,
        error: false,
        message: "Product Rams deleted successfully.",
      });
    } catch (exception) {
      console.error("deleteMultipleProductRams error:", exception);
      next(exception);
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id).populate(
        "category"
      );

      if (!product) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Product Not Found",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product fetched Successfully",
        status: "SUCCESS",
        product: product,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const oldProduct = await ProductModel.findById(req.params.id);

      if (!oldProduct) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Product not found",
          status: "NOT_FOUND",
        });
      }

      let updatedImages = req.body.images || [];

      // Remove deleted images from Cloudinary
      const deletedImages = req.body.deletedImages || [];
      for (let imgUrl of deletedImages) {
        try {
          const uploadIndex = imgUrl.indexOf("/upload/");
          if (uploadIndex !== -1) {
            let publicId = imgUrl
              .substring(uploadIndex + 8)
              .replace(/v\d+\//, "");
            publicId = publicId.replace(/\.(webp|jpg|jpeg|png)+$/i, "");
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          console.error("Cloudinary delete failed:", err);
        }
      }

      // Upload newly added images (if any)
      if (req.files && req.files.length > 0) {
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        };

        for (let i = 0; i < req.files.length; i++) {
          try {
            const result = await cloudinary.uploader.upload(
              req.files[i].path,
              options
            );
            updatedImages.push(result.secure_url);
            // Clean up temp file
            try {
              fs.unlinkSync(req.files[i].path);
            } catch (err) {
              console.error("Error deleting local file:", err);
            }
          } catch (error) {
            return res.status(422).json({
              code: 422,
              message: "Error uploading image.",
              status: "UPLOAD_ERROR",
              error: error.message,
            });
          }
        }
      }

      // Update Product
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          images: updatedImages,
          bannerImages: req.body.bannerImages,
          bannerTitleName: req.body.bannerTitleName,
          isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
          brand: req.body.brand,
          price: req.body.price,
          oldPrice: req.body.oldPrice,
          catName: req.body.catName,
          catId: req.body.catId,
          subCatId: req.body.subCatId,
          subCat: req.body.subCat,
          thirdSubCat: req.body.thirdSubCat,
          thirdSubCatId: req.body.thirdSubCatId,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          isFeatured: req.body.isFeatured,
          discount: req.body.discount,
          productRam: req.body.productRam,
          size: req.body.size,
          productWeight: req.body.productWeight,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Updated Successfully",
        status: "UPDATED",
        product: updatedProduct,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProductRam = async (req, res, next) => {
    try {
      const oldProductRam = await ProductRamModel.findById(req.params.id);

      if (!oldProductRam) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Product Ram not found",
          status: "NOT_FOUND",
        });
      }

      // Update Product Ram
      const updatedProductRam = await ProductRamModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );

      if (!updatedProductRam) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Rams cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Ram Updated Successfully",
        status: "UPDATED",
        product: updatedProductRam,
      });
    } catch (exception) {
      next(exception);
    }
  };

  createProductWeight = async (req, res, next) => {
    try {
      let productWeight = new ProductWeightModel({
        name: req.body.name,
      });

      productWeight = await productWeight.save();
      if (!productWeight) {
        res.status(500).json({
          error: true,
          success: false,
          message: "Product Weight Not Created",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Weight Created Successfully",
        product: productWeight,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductWeights = async (req, res, next) => {
    try {
      const productWeight = await ProductWeightModel.find();

      return res.json({
        error: false,
        success: true,
        message: "Product Weights fetched successfully",
        status: "PRODUCTS_FETCHED",
        data: productWeight,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listProductWeightById = async (req, res, next) => {
    try {
      const WeightId = req.params.id;
      const productWeight = await ProductWeightModel.findById(WeightId);

      if (!productWeight) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Weight Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Weight fetched Successfully",
        status: "PRODUCT_FETCHED",
        data: productWeight,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProductWeight = async (req, res, next) => {
    try {
      const oldProductWeight = await ProductWeightModel.findById(req.params.id);

      if (!oldProductWeight) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Product Weight not found",
          status: "NOT_FOUND",
        });
      }

      // Update Product Weight
      const updatedProductWeight = await ProductWeightModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );

      if (!updatedProductWeight) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Weight cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Weight Updated Successfully",
        status: "UPDATED",
        product: updatedProductWeight,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProductWeight = async (req, res, next) => {
    try {
      const productWeights = await ProductWeightModel.findById(req.params.id);

      if (!productWeights) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Product Weight not found",
          status: "NOT_FOUND",
        });
      }

      const deleteProductWeight = await ProductWeightModel.findByIdAndDelete(
        req.params.id
      );

      if (!deleteProductWeight) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Weight can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Weight Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteMultipleProductWeights = async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "Invalid input: 'ids' must be a non-empty array.",
        });
      }

      const productsWeights = await ProductWeightModel.find({
        _id: { $in: ids },
      });

      if (!productsWeights || productsWeights.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No product Weight found for the provided IDs.",
        });
      }

      // Delete productsWeights from DB
      await ProductWeightModel.deleteMany({ _id: { $in: ids } });

      return res.json({
        success: true,
        error: false,
        message: "Product Weights deleted successfully.",
      });
    } catch (exception) {
      console.error("deleteMultipleProductWeights error:", exception);
      next(exception);
    }
  };

  createProductSize = async (req, res, next) => {
    try {
      let productSize = new ProductSizeModel({
        name: req.body.name,
      });

      productSize = await productSize.save();
      if (!productSize) {
        res.status(500).json({
          error: true,
          success: false,
          message: "Product Size Not Created",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Size Created Successfully",
        product: productSize,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductSize = async (req, res, next) => {
    try {
      const productSize = await ProductSizeModel.find();

      return res.json({
        error: false,
        success: true,
        message: "Product Size fetched successfully",
        status: "PRODUCTS_FETCHED",
        data: productSize,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listProductSizeById = async (req, res, next) => {
    try {
      const SizeId = req.params.id;
      const productSize = await ProductSizeModel.findById(SizeId);

      if (!productSize) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Size Does not Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Size fetched Successfully",
        status: "PRODUCT_FETCHED",
        data: productSize,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProductSize = async (req, res, next) => {
    try {
      const oldProductSize = await ProductSizeModel.findById(req.params.id);

      if (!oldProductSize) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Product Size not found",
          status: "NOT_FOUND",
        });
      }

      // Update Product Size
      const updatedProductSize = await ProductSizeModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );

      if (!updatedProductSize) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Size cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Size Updated Successfully",
        status: "UPDATED",
        product: updatedProductSize,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProductSize = async (req, res, next) => {
    try {
      const productSize = await ProductSizeModel.findById(req.params.id);

      if (!productSize) {
        return res.status(404).json({
          code: 404,
          error: true,
          success: false,
          message: "Product Size not found",
          status: "NOT_FOUND",
        });
      }

      const deleteProductSize = await ProductSizeModel.findByIdAndDelete(
        req.params.id
      );

      if (!deleteProductSize) {
        return res.status(422).json({
          code: 422,
          error: true,
          success: false,
          message: "Product Size can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Product Size Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteMultipleProductSizes = async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "Invalid input: 'ids' must be a non-empty array.",
        });
      }

      const productsSizes = await ProductSizeModel.find({ _id: { $in: ids } });

      if (!productsSizes || productsSizes.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No product Size found for the provided IDs.",
        });
      }

      // Delete productsSizes from DB
      await ProductSizeModel.deleteMany({ _id: { $in: ids } });

      return res.json({
        success: true,
        error: false,
        message: "Product Sizes deleted successfully.",
      });
    } catch (exception) {
      console.error("deleteMultipleProductSizes error:", exception);
      next(exception);
    }
  };
}

const productCtrl = new ProductController();
export default productCtrl;
