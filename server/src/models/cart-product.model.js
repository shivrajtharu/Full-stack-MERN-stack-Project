import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema({
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1, 
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
},
{
    timestamps: true,
})

const CartProductModel = mongoose.model("CartProduct", CartProductSchema);
export default CartProductModel;