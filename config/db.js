const mongoose=require("mongoose");
const ConnectDB= async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected MongoDB Successfully");
    }catch(e){
        console.log(e);
        process.exit(1);


    }
}
module.exports=ConnectDB;