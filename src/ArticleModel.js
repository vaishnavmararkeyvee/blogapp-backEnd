const mongoose = require('mongoose');
let mongooseSchema=mongoose.Schema;
const articleSchema=new mongooseSchema(
    {
    username:String,
    title:String,
    content:String
}
);
var articleModelObj=mongoose.model("articles",articleSchema);
module.exports={articleModelObj};