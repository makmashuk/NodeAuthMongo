const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


//Import Route
const authRoute = require('./routes/auth');


//ENV CONFIG
dotenv.config();

//CONNECT TO DB
mongoose.connect(
    process.env.DB_Connect,
    {useNewUrlParser: true},
    () => console.log("Connected")
);


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Route Middleware
app.use('/api/user', authRoute);



app.listen(3000,()=> console.log("Server at 3000" ))