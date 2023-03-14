import mongoose from "mongoose"

const db = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB)
        console.log("DB connect successfull")
    } catch (error) {
        console.log(error.message)
    }

}

export default db;