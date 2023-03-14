import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    prodectId:{
        type:mongoose.Types.ObjectId,
        ref:"Prodect"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    size: {
        required: false,
        type: String,
      },
      color: {
        required: false,
        type: String,
      },
      quantities: {
        required: true,
        type: Number,
      },
      address: {
        required: true,
        type: Map,
      },
      status: {
        default: false,
        type: Boolean,
      },
      receipet:{
        default:false,
        type:Boolean
      },
      confirmReview:{
        type:Boolean,
        default:false
      }
     
},{timestamps:true})

const OrderModel = mongoose.model("Order",orderSchema);
export default OrderModel;