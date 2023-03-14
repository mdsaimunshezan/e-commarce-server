import mongoose, { Mongoose } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true,
        default:false
    }
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel;