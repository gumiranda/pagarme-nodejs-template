const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const variables = require("../bin/configuration/variables");
const userRouter = require("../routes/user-router");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

module.exports = app;

mongoose.connect(variables.Database.connection,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true});

app.use("/api/user",userRouter);