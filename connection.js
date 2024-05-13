const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/mongodbtutoriallearning2024').then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log("Error", err)
})



// Declare the Schema of the Mongo model
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
    date:{
        type:Date
    }
   
});

//Export the model
const User = new mongoose.model('User', userSchema);

module.exports = User

