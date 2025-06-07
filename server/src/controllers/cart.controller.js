import CartProductModel from "../models/cart-product.model.js";
import UserModel from "../models/user.model.js";

class CartController {
  addToCartItem = async (req, res, next) => {
    try {
      const userId = req.userId;
      const productId = req.body.productId;

      if (!productId) {
        return res.status(402).json({
          code: 402,
          message: "Product Id Required",
          status: "PRODUCT_ID_REQUIRED",
        });
      }

      const checkItemCart = await CartProductModel.findOne({
        userId: userId,
        productId: productId,
      });

      if (checkItemCart) {
        return res.status(400).json({
          code: 400,
          message: "Item already exist in the cart",
          status: "ITEM_ALREADY_EXIST",
        });
      }

      const cartItem = new CartProductModel({
        quantity: 1,
        userId: userId,
        productId: productId,
      });

      const save = await cartItem.save();

      const updateUserCart = await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            shopping_cart: productId,
          },
        }
      );

      return res.json({
        data: save,
        message: "Item Added Successfully",
        status: "ITEM_ADDED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getCartItem = async (req, res, next) => {
    try {
      const userId = req.userId;

      const cartItems = await CartProductModel.find({
        userId: userId,
      }).populate("productId");

      return res.json({
        data: cartItems,
        message: "Cart items fetched successfully",
        status: "CART_ITEM_FETCHED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCartItemQty = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { _id, quantity } = req.body;

      if (!_id || !quantity) {
        return res.status(400).json({
          code: 400,
          message: "Provide _id, quantity",
          status: "ERROR",
        });
      }

      const updateCartItem = await CartProductModel.updateOne(
        {
          _id: _id,
          userId: userId,
        },
        {
          quantity: quantity,
        }
      );

      return res.json({
        message: "Cart item quantity updated successfully",
        status: "CART_ITEM_UPDATED",
        data: updateCartItem,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteCartItem = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { _id, productId } = req.body;
      
      if (!_id) {
        return res.status(400).json({
          code: 400,
          message: "Provide _id",
          status: "ID_REQUIRED"
        });
      }

      const deleteCartItem = await CartProductModel.deleteOne({
        _id: _id,
        userId: userId
      });

      if (!deleteCartItem || deleteCartItem.deletedCount === 0) {
        return res.status(404).json({
          code: 404,
          message: "The Product in the Cart is not found",
          status: "NOT_FOUND"
        });
      }

      const updateUserCart = await UserModel.updateOne(
        { _id: userId },
        { $pull: { shopping_cart: productId } }
      );

      return res.json({
        message: "Cart Item deleted Successfully",
        status: "DELETED_CART_ITEM",
        data: deleteCartItem
      });

    } catch (exception) {
      next(exception);
    }
  };


}

const cartCtrl = new CartController();
export default cartCtrl;
