import {Router} from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import uploader from "../middlewares/multipart-handle.middleware.js";
import productCtrl from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.post('/create-product', permissionCheck, uploader("image").array("images"), productCtrl.createProduct);   
productRouter.get('/list-products', productCtrl.listAllProduct)
productRouter.get('/list-productsByCatId/:id', productCtrl.listAllProductByCatId)
productRouter.get('/list-productsByCatName', productCtrl.listAllProductByCatName)
productRouter.get('/list-productsBySubCatId/:id', productCtrl.listAllProductBySubCatId)
productRouter.get('/list-productsBySubCatName', productCtrl.listAllProductBySubCatName)
productRouter.get('/list-productsByThirdSubCatId/:id', productCtrl.listAllProductByThirdSubCatId)
productRouter.get('/list-productsByThirdSubCatName', productCtrl.listAllProductByThirdSubCatName)
productRouter.get('/list-productsByPrice', productCtrl.listAllProductByPrice)
productRouter.get('/list-productsByRating', productCtrl.listAllProductByRating)
productRouter.get('/product-counts', productCtrl.getProductCounts)
productRouter.get('/featured-products', productCtrl.listAllFeaturedProducts)
productRouter.delete('/delete-product/:id', permissionCheck, productCtrl.deleteProduct)
productRouter.get('/:id', productCtrl.getProductById);
productRouter.delete('/deleteImage', permissionCheck, productCtrl.removeImageFromCloudinary);
productRouter.put('/update/:id', permissionCheck, uploader("image").array("images"), productCtrl.updateProduct);

export default productRouter;