import mongoose from "mongoose";

const MyListSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    brand: {
        type:String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
},{
    timestamps: true
}
)

const MyListModel = mongoose.model("MyList", MyListSchema);
export default MyListModel;