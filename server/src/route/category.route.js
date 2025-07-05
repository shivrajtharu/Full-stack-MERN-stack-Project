import { Router } from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import categoryCtrl from "../controllers/category.controller.js";
import uploader from "../middlewares/multipart-handle.middleware.js";

const categoryRouter = Router();
categoryRouter.post('/uploadImages', permissionCheck, uploader("image").array('images'), categoryCtrl.uploadImages);
categoryRouter.delete('/delete-image', permissionCheck, categoryCtrl.removeImage);
categoryRouter.post('/create-category', permissionCheck, categoryCtrl.createCategory);
categoryRouter.get('/', categoryCtrl.listAllCategories);
categoryRouter.get('/count', categoryCtrl.getCategoriesCounts);
categoryRouter.get('/subCat-count', categoryCtrl.getSubCategoriesCounts);
categoryRouter.get('/:id', categoryCtrl.detailById);
categoryRouter.delete('/:id', permissionCheck, categoryCtrl.deleteCategory);
categoryRouter.put('/:id', permissionCheck, uploader("image").array("images"), categoryCtrl.updateCategory);

export default categoryRouter;