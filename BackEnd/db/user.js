const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        unique:true
    },

    userProfile:{
        firstname:String,
        lastname:String,
        email:String,
    }
})
const User=mongoose.model("User",UserSchema);
module.exports=User;
