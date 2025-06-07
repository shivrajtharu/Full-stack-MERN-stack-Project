import MyListModel from "../models/my-list.model.js";

class MyListController {

  addToMyList = async (req, res, next) => {
    try {
      const userId = req.userId; //middleware
      const {
        productId,
        productTitle,
        image,
        rating,
        price,
        oldPrice,
        brand,
        discount,
      } = req.body;

      const checkMyList = await MyListModel.findOne({
        productId: productId,
        userId: userId,
      });

      if (checkMyList) {
        return res.status(400).json({
          code: 400,
          message: "Item already exist in MyList",
          status: "ITEM_ALREADY_EXIST",
        });
      }

      const myList = new MyListModel({
        userId: userId,
        productId: productId,   
        image: image,
        productTitle: productTitle,
        brand: brand,
        price: price,
        oldPrice: oldPrice,
        rating: rating,
        discount: discount,
      });

      const save = await myList.save();

      return res.json({
        data: save,
        message: "Item Added Successfully",
        status: "ITEM_ADDED",
      });

    } catch (exception) {
      next(exception);
    }
  };

  deleteMyListItem = async (req, res, next) => {
    try{
        const myListItem = await MyListModel.findById(req.params.id);

        if(!myListItem){
            return res.status(404).json({
                code: 404,
                message: "My List item with the given Id was not Found",
                status: "NOT_FOUND"
            })
        }

        const deleteItem = await MyListModel.findByIdAndDelete(req.params.id);

        if(!deleteItem){
            return res.status(422).json({
                code: 400,
                message: "Failed to delete MyList Item",
                status: "DELETION_FAILED"
            })
        }

        return res.json({
            message: "MyList Item deleted Successfully",
            status: "DELETED",
        })

    }catch(exception){
        next(exception);
    }
  };

 listAll = async (req, res, next) => {
    try{
        const userId = req.userId;

        const myListItems = await MyListModel.find({
            userId: userId
        });

        if(!myListItems || myListItems.length === 0){
            return res.status(404).json({
                code: 404,
                message: "MyList Items not found with given userId"
            })
        }

        return res.json({
            message: "MyList Items Fetched Successfully",
            status: "ITEMS_FETCHED",
            data: myListItems
        })


    }catch(exception){
        next(exception);
    }
 }

}

const myListCtrl = new MyListController();
export default myListCtrl;
