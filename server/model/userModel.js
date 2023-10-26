import mongoose from "mongoose";

 const userSchema =mongoose.Schema({
    name:String,
    password:String,
    email:String,
    onlineStatus:Boolean,
    userStatus:Boolean,
})

export const User=mongoose.model('users',userSchema)