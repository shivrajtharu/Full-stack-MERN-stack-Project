import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import HomeSlideModel from "../models/homeSlide.model.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class HomeSlideController {
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

  createHomeSlide = async (req, res, next) => {
    try {
      // Expect images to be sent in req.body.images as an array
      let images = req.body.images;
      if (typeof images === "string") {
        // If sent as a single string, wrap in array
        images = [images];
      }
      let HomeSlide = new HomeSlideModel({
        images: images || [],
      });

      if (!HomeSlide) {
        return res.status(500).json({
          error: true,
          success: false,
          message: "Failed to Create HomeSlide",
          status: "HOME_SLIDE_NOT_CREATED",
        });
      }

      HomeSlide = await HomeSlide.save();

      return res.json({
        success: true,
        error: false,
        message: "HomeSlide created successfully",
        status: "HOME_SLIDE_CREATED",
        HomeSlide: HomeSlide,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllHomeSlides = async (req, res, next) => {
    try {
      const HomeSlides = await HomeSlideModel.find().sort({createdAt: -1});

      return res.json({
        success: true,
        error: false,
        message: "HomeSlides fetched successfully",
        status: "HOME_SLIDES_FETCHED",
        data: HomeSlides,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getSlidesCounts = async (req, res, next) => {
    try {
      const HomeSlideCount = await HomeSlideModel.countDocuments();

      if (HomeSlideCount === 0) {
        return res.status(404).json({
          code: 404,
          success: false,
          error: true,
          message: "No HomeSlides found",
          status: "HOME_SLIDES_NOT_FOUND",
        });
      }

      return res.status(200).json({
        code: 200,
        success: true,
        error: false,
        message: "Success",
        status: "OK",
        HomeSlideCount,
      });
    } catch (exception) {
      next(exception);
    }
  };

  detailById = async (req, res, next) => {
    try {
      const HomeSlide = await HomeSlideModel.findById(req.params.id);

      if (!HomeSlide) {
        return res.status(500).json({
          success: false,
          error: true,
          code: 500,
          message: "HomeSlide with the given id was not found.",
          status: "HOME_SLIDE_NOT_FOUND",
        });
      }

      return res.json({
        success: true,
        error: false,
        HomeSlide: HomeSlide,
        message: "Success",
        status: "Ok",
      });
    } catch (exception) {
      next(exception);
    }
  };

  // delete category by Id and subCategories inside this category
  deleteHomeSlide = async (req, res, next) => {
    try {
      const HomeSlide = await HomeSlideModel.findById(req.params.id);

      if (!HomeSlide) {
        return res.status(404).json({
          success: false,
          error: true,
          code: 404,
          message: "HomeSlide not found",
          status: "NOT_FOUND",
        });
      }

      const images = HomeSlide.images;

      for (let img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const imageName = urlArr[urlArr.length - 1].split(".")[0];

        if (imageName) {
          await cloudinary.uploader.destroy(imageName);
        }
      }

      const deleteHomeSlide = await HomeSlideModel.findByIdAndDelete(
        req.params.id
      );

      if (!deleteHomeSlide) {
        return res.status(422).json({
          code: 422,
          success: false,
          error: true,
          message: "HomeSlide can not be deleted",
          status: "CAN_NOT_DELETE",
        });
      }

      return res.json({
        success: true,
        error: false,
        message: "HomeSlide Deleted Successfully",
        status: "DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateHomeSlide = async (req, res, next) => {
    try {
      const oldHomeSlide = await HomeSlideModel.findById(req.params.id);

      if (!oldHomeSlide) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "HomeSlide not found",
        });
      }

      let updatedImages = req.body.images || oldHomeSlide.images;

      //  Delete any images requested by the frontend
      if (req.body.deletedImages && Array.isArray(req.body.deletedImages)) {
        for (let imgUrl of req.body.deletedImages) {
          const publicId = imgUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // If new files are uploaded, upload and overwrite image list
      if (req.files && req.files.length > 0) {
        // Optional: Clear remaining old images again to avoid duplication
        for (let imgUrl of updatedImages) {
          const publicId = imgUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        updatedImages = [];
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        };

        for (let file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, options);
          updatedImages.push(result.secure_url);
          fs.unlinkSync(file.path);
        }
      }

      const updatedHomeSlide = await HomeSlideModel.findByIdAndUpdate(
        req.params.id,
        {
          images: updatedImages,
        },
        { new: true }
      );

      if (!updatedHomeSlide) {
        return res.status(422).json({
          error: true,
          success: false,
          message: "HomeSlide cannot be updated",
        });
      }

      return res.json({
        success: true,
        error: false,
        message: "HomeSlide Updated Successfully",
        HomeSlide: updatedHomeSlide,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const homeSlideCtrl = new HomeSlideController();
export default homeSlideCtrl;
