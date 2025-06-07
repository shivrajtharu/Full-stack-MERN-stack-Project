import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ProductModel from "../models/product.model.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var ImagesArr = [];

class ProductController {
  createProduct = async (req, res, next) => {
    try {
      ImagesArr = [];
      const image = req.files;

      // Check if files are provided
      if (!image || !Array.isArray(image) || image.length === 0) {
        return res.status(400).json({
          code: 400,
          message: "No images provided.",
          status: "NO_IMAGES",
        });
      }

      // Upload images to Cloudinary
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      for (let i = 0; i < image.length; i++) {
        try {
          const result = await cloudinary.uploader.upload(
            image[i].path,
            options
          );
          ImagesArr.push(result.secure_url);
          fs.unlinkSync(image[i].path); // Delete the local file after upload
          console.log(image[i].filename);
        } catch (error) {
          return res.status(422).json({
            code: 422,
            message: "Error uploading image.",
            status: "UPLOAD_ERROR",
            error: error.message,
          });
        }
      }

      let product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        images: ImagesArr,
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
      });

      product = await product.save();

      if (!product) {
        return res.status(500).json({
          code: 500,
          message: "Product not created",
          status: "PRODUCT_NOT_CREATED",
        });
      }

      return res.json({
        message: "Product created successfully",
        status: "PRODUCT_CREATED",
        product: product,
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
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find()
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
        totalPages: totalPages,
        page: page,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProductByCatId = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const totalPosts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / perPage);

      if (page > totalPages) {
        return res.status(404).json({
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({ catId: req.params.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
        totalPages: totalPages,
        page: page,
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
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({ catName: req.query.catName })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({ subCatId: req.params.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({ subCat: req.query.subCat })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({ thirdSubCatId: req.params.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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
          code: 404,
          message: "Page Not Found",
          status: "NOT_FOUND",
        });
      }

      const produtcs = await ProductModel.find({
        thirdSubCat: req.query.thirdSubCat,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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

      const filteredproducts = await ProductModel.find(filter).populate(
        "category"
      );

      return res.json({
        message: "Products filtered by price",
        products: filteredproducts,
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

      const filteredproducts = await ProductModel.find(filter)
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      if (!filteredproducts || filteredproducts.length === 0) {
        return res.status(404).json({
          code: 404,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        products: filteredproducts,
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
          message: "No products found",
          status: "PRODUCT_NOT_FOUND",
        });
      }

      return res.json({
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
      const produtcs = await ProductModel.find({
        isFeatured: true,
      }).populate("category");

      if (!produtcs) {
        return res.status(422).json({
          code: 422,
          message: "Product Doesnot Exists",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "PRODUCT_FETCHED",
        produtcs: produtcs,
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
          message: "Product can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        message: "Product Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
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
          message: "Product Not Found",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        message: "Product fetched Successfully",
        status: "SUCCESS",
        product: product,
      });
    } catch (exception) {
      next(exception);
    }
  };

  removeImageFromCloudinary = async (req, res, next) => {
    const imgUrl = req.query.img;
    const urlArr = imgUrl.split("/");
    const imageName = urlArr[urlArr.length - 1].split(".")[0];

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
          // console.log(error, res)
        }
      );

      if (res) {
        response.status(200).send(res);
      }
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const oldProduct = await ProductModel.findById(req.params.id);

      if (!oldProduct) {
        return res.status(404).json({
          code: 404,
          message: "Product not found",
          status: "NOT_FOUND",
        });
      }

      let updatedImages = oldProduct.images; // Start with old images

      // If new files are uploaded
      if (req.files && req.files.length > 0) {
        // Delete old images from Cloudinary
        for (let imgUrl of oldProduct.images) {
          try {
            const publicId = imgUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (exception) {
            // Log error but continue
            console.error("Error deleting image from Cloudinary:", exception);
          }
        }

        // Upload new images
        updatedImages = [];
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
            try {
              fs.unlinkSync(req.files[i].path); // Clean up local files
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

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          images: updatedImages,
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
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        return res.status(422).json({
          code: 422,
          message: "Product cannot be updated",
          status: "CANNOT_UPDATED",
        });
      }

      return res.json({
        message: "Product Updated Successfully",
        status: "UPDATED",
        product: updatedProduct,
      });
    } catch (exception) {
      next(exception);
    }
  };

  
}

const productCtrl = new ProductController();
export default productCtrl;
