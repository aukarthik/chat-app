const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://host:host@cluster0.menmk.mongodb.net/bonk?retryWrites=true&w=majority&appName=Cluster0")


const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    lastName:{
        type:String,
        required:true,
        min:1
    },
    firstName:{
        type:String,
        required:true,
        min:2
    }
})

const User=mongoose.model("User",UserSchema)

const MessageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required:true

    }
})
const Message=mongoose.model("Message",MessageSchema)

module.exports={User,Message}