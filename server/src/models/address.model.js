import mongoose, { Schema } from "mongoose";

const AddressSchema = new mongoose.Schema({
    address_line1: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    provision: {
        type: String,
        default: ""
    },
    pincode: {
        type: String
    },
    country: {
        type:String
    },
    mobile: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    selected: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        default: ''
    },
}, {
    timestamps: true
})

const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;