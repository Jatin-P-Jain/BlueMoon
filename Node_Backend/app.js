const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const userRoute = require('./routes/users');
const tasksRoute = require('./routes/tasks');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyparser.json());
app.use('/tasks',tasksRoute);
app.use('/users',userRoute);


app.get('/', (req,res) => {
    res.send("We are on Home!!")
})

mongoose.connect("mongodb://localhost:27017/simplileap", () => 
    console.log("DB Connected!")
)
app.listen(3000)