import {Router} from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import addressCtrl from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add', permissionCheck, addressCtrl.addAddress);
addressRouter.get('/get', permissionCheck, addressCtrl.getAddress);
addressRouter.delete('/delete/:id', permissionCheck, addressCtrl.deleteAddress);

export default addressRouter;