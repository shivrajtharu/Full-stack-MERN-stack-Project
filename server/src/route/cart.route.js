import {Router} from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import cartCtrl from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/add', permissionCheck, cartCtrl.addToCartItem);
cartRouter.get('/get', permissionCheck, cartCtrl.getCartItem);
cartRouter.put('/update-qty', permissionCheck, cartCtrl.updateCartItemQty);
cartRouter.delete('/delete-cart-item', permissionCheck, cartCtrl.deleteCartItem);

export default cartRouter;