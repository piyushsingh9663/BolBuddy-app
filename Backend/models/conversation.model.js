import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    sender:{
        type:String,
        enum:["user","bot"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})

const conversation=mongoose.model("conversation",messageSchema);
export default conversation;