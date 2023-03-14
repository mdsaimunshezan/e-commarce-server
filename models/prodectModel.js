import mongoose from "mongoose"

export const prodectSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    discount:{
        required:true,
        type:Number
    },
    price:{
        required:true,
        type:Number
    },
    stock:{
        required:true,
        type:Number
    },
    colors:{
        required:true,
        type:Array,
    },
    value:{
        required:true,
        type:String
    },
    size:{
        required:true,
        type:Array,
    },
    image1:{
        required:true,
        type:String,
    },
    image2:{
        required:true,
        type:String,
    },
    image3:{
        required:true,
        type:String,
    },
    reviews:[{type:mongoose.Types.ObjectId,ref:"Review"}],
},{timestamps:true})

const ProdectModel = mongoose.model("Prodect",prodectSchema);

export default ProdectModel;