const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { articleModelObj } = require('./src/ArticleModel');
const { userModelObj } = require('./src/UserModel');

const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors())
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,UPDATE,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://vaishnav:vaishnav@cluster0.nyrni.mongodb.net/BlogDatabase?retryWrites=true&w=majority");

app.post('/api/add', async (req, res) => {
    try {
        console.log(req.body);
        let mydata = new articleModelObj(req.body);
        let data = await mydata.save();
        console.log("Successfully Added Data");
        res.send("Successfully Added Data");
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/api/view', async (req, res) => {
    try {
        let result = await articleModelObj.find();
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
});
app.post('/api/delete', async (req, res) => {
    try {
        let result = await articleModelObj.deleteOne({title:req.body.title});
        console.log("Successfully Deleted Article : "+req.body.title);
        res.send("Deleted"+req.body.title);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/api/update', async (req, res) => {
    try {
     console.log(req.body);
        let result = await articleModelObj.updateOne({title:req.body.title},{$set:{content:req.body.content}});
        console.log("Successfully Updated Article with title : "+req.body.title);
        res.send("Updated"+req.body.title);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        console.log(req.body);
        let mydata = new userModelObj(req.body);
        let data = await mydata.save();
        res.send("Successfully Added Data");
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/api/login', async (req, res) => {
    try {
        let result = await userModelObj.find();
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});