const mongoose=require("mongoose");
const noteSchema=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    title:{
        type:String,
        required:[true,"Please fill the title"]
    },
    desc:{
        type:String,
        required:false
    },
    ProjectName:{
        type:String,
        required:false
    },
    assignedto:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    task:{
        type:String,
        required:false
    },
    startTime:{
        type:String,
        required:false
    },
    endTime:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },  
} ,{
    timeStamps:true
}
);
 module.exports=mongoose.model("Note",noteSchema);