import { Router } from "express";
import userRouter from "../route/user.route.js";
import categoryRouter from "../route/category.route.js";
import productRouter from "../route/product.route.js";
import cartRouter from "../route/cart.route.js";
import myListRouter from "../route/my-list.route.js";
import addressRouter from "../route/address.route.js";
import HomeSlideRouter from "../route/HomeSlide.route.js";


const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/myList', myListRouter);
router.use('/address', addressRouter);
router.use('/homeSlide', HomeSlideRouter)

export default router;  