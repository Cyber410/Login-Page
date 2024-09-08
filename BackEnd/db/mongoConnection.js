const mongoose=require('mongoose');

const url="mongodb://localhost:27017/UserAuthentication";

const connectdb= async()=>{
    try{
        await mongoose.connect(url);
        console.log("connected");

    }

    catch(error){
        console.log(`${error}`);

    }
}

module.exports =connectdb;