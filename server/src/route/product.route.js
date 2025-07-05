import {Router} from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import uploader from "../middlewares/multipart-handle.middleware.js";
import productCtrl from "../controllers/product.controller.js";


const productRouter = Router();
productRouter.post('/uploadImages', permissionCheck, uploader("image").array('images'), productCtrl.uploadImages);
productRouter.post('/uploadBannerImages', permissionCheck, uploader("image").array('images'), productCtrl.uploadBannerImages);
productRouter.delete('/delete-image', permissionCheck, productCtrl.removeImage);
productRouter.post('/create-product', permissionCheck, productCtrl.createProduct);
productRouter.post('/productRams/create', permissionCheck, productCtrl.createProductRam);
productRouter.get('/', productCtrl.listAllProduct)
productRouter.get('/productRams', productCtrl.listAllProductRams);
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
productRouter.delete('/deleteMultiple', permissionCheck, productCtrl.deleteMultipleProduct)
productRouter.delete('/deleteMultipleRams', permissionCheck, productCtrl.deleteMultipleProductRams);

productRouter.post('/productSize/create', permissionCheck, productCtrl.createProductSize);
productRouter.get('/productSize', productCtrl.listAllProductSize);
productRouter.delete('/deleteMultipleSize', permissionCheck, productCtrl.deleteMultipleProductSizes);
productRouter.get('/productSize/:id', productCtrl.listProductSizeById);
productRouter.delete('/productSize/:id', permissionCheck, productCtrl.deleteProductSize)
productRouter.put('/updateProductSize/:id', permissionCheck, productCtrl.updateProductSize);

productRouter.post('/productWeight/create', permissionCheck, productCtrl.createProductWeight);
productRouter.get('/productWeight', productCtrl.listAllProductWeights);
productRouter.delete('/deleteMultipleWeight', permissionCheck, productCtrl.deleteMultipleProductWeights);
productRouter.get('/productWeight/:id', productCtrl.listProductWeightById);
productRouter.delete('/productWeight/:id', permissionCheck, productCtrl.deleteProductWeight);
productRouter.put('/updateProductWeight/:id', permissionCheck, productCtrl.updateProductWeight);

productRouter.get('/productRams/:id', productCtrl.listProductRamById);
productRouter.delete('/:id', permissionCheck, productCtrl.deleteProduct)
productRouter.delete('/productRams/:id', permissionCheck, productCtrl.deleteProductRam)
productRouter.get('/:id', productCtrl.getProductById);
productRouter.put('/:id', permissionCheck, uploader("image").array("images"), productCtrl.updateProduct);
productRouter.put('/updateProductRam/:id', permissionCheck, productCtrl.updateProductRam);

export default productRouter;