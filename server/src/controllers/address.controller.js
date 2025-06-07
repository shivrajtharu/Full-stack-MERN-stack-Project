import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

class AddressController {
  addAddress = async (req, res, next) => {
    try {
      const {
        address_line1,
        city,
        provision,
        pincode,
        country,
        mobile,
        status,
        selected,
      } = req.body;

      const userId = req.userId;

      if (
        !address_line1 ||
        !city ||
        !provision ||
        !pincode ||
        !country ||
        !mobile
      ) {
        return res.status(422).json({
          error: true,
          success: false,
          message: "Please Provide all the required fields",
        });
      }

      const address = new AddressModel({
        address_line1,
        city,
        provision,
        pincode,
        country,
        mobile,
        status,
        userId,
        selected,
      });

      const savedAddress = await address.save();

      const updateCartUser = await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            address_details: savedAddress?.id,
          },
        }
      );

      res.json({
        success: true,
        error: false,
        message: "Address added successfully",
        data: savedAddress,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getAddress = async (req, res, next) => {
    try {
      const address = await AddressModel.find({
        userId: req?.query?.userId,
      });

      if (!address || address.length === 0) {
        return res.status(404).json({
          error: true,
          success: false,
          code: 404,
          message: "Address Not Found",
          status: "NOT_FOUND",
        });
      }

      return res.json({
        error: false,
        success: true,
        message: "Address fetched Successfully",
        address: address,
      });
    } catch (exception) {
      next(exception);
    }
  };

deleteAddress = async (req, res, next) => {
  try {
    const userId = req.userId; // from middleware
    const _id = req.params.id; 

    if (!_id) {
      return res.status(400).json({
        code: 400,
        error: true,
        success: false,
        message: "Provide _id",
        status: "ID_REQUIRED",
      });
    }

    const deleteItem = await AddressModel.deleteOne({ _id, userId });

    if (!deleteItem || deleteItem.deletedCount === 0) {
      return res.status(404).json({
        error: true,
        success: false,
        code: 404,
        message: "The Address in the database not found",
        status: "NOT_FOUND",
      });
    }

    await UserModel.updateOne({ _id: userId }, { $pull: { address_details: _id } });

    return res.json({
      error: false,
      success: true,
      message: "Address deleted successfully",
      status: "DELETED_ADDRESS",
      data: { _id },
    });
  } catch (exception) {
    next(exception);
  }
};


}

const addressCtrl = new AddressController();
export default addressCtrl;
