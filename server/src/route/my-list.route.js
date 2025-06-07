import {Router} from "express";
import permissionCheck from "../middlewares/auth.middleware.js";
import myListCtrl from "../controllers/my-list.controller.js";

const myListRouter = Router();

myListRouter.post('/add', permissionCheck, myListCtrl.addToMyList);
myListRouter.get('/', permissionCheck, myListCtrl.listAll);
myListRouter.delete('/delete/:id', permissionCheck, myListCtrl.deleteMyListItem);

export default myListRouter;