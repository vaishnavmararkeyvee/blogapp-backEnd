const mongoose = require('mongoose');
let mongooseSchema=mongoose.Schema;
const userSchema=new mongooseSchema(
    {
    username:String,
    email:String,
    password:String
}
);
var userModelObj=mongoose.model("users",userSchema);
module.exports={userModelObj};