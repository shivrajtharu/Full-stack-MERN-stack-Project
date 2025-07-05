import { Router } from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import uploader from "../middlewares/multipart-handle.middleware.js";
import homeSlideCtrl from "../controllers/homeSlide.controller.js";

const HomeSlideRouter = Router();
HomeSlideRouter.post('/uploadImages', permissionCheck, uploader("image").array('images'), homeSlideCtrl.uploadImages);
HomeSlideRouter.delete('/delete-image', permissionCheck, homeSlideCtrl.removeImage);
HomeSlideRouter.post('/create-homeSlide', permissionCheck, homeSlideCtrl.createHomeSlide);
HomeSlideRouter.get('/', homeSlideCtrl.listAllHomeSlides);
HomeSlideRouter.get('/count', homeSlideCtrl.getSlidesCounts);
HomeSlideRouter.get('/:id', homeSlideCtrl.detailById);
HomeSlideRouter.delete('/:id', permissionCheck, homeSlideCtrl.deleteHomeSlide);
HomeSlideRouter.put('/:id', permissionCheck, uploader("image").array("images"), homeSlideCtrl.updateHomeSlide);

export default HomeSlideRouter;