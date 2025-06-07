import mongoose from "mongoose";

const OrderShema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: String,
    required: [true, "Order ID is required"],
    unique: true,
  },
  prodyuctId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  product_details: {
    name: String, 
    Image: Array,
  },
  paymentId: {
    type: String,
    default: ""
  },
  payment_status: {
    type: String,
    default: ""
  },
  delivery_address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
  },
  subTotalAmt: {
    type: Number,
    default: 0,
  }, 
  totalAmt: {
    type: Number,
    default: 0,
  },

}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", OrderShema);
export default OrderModel;
