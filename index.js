const express= require('express');
const app= express();
const port = process.env.PORT || '3000'
const home = require('./routes/home')
const conn = require('./config');
const bodyParser = require("body-parser");
// const errorController = require('./controllers/error');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
app.use(cors());
// require('./db/connectDB');

conn.connect((error)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log("database connected")
  }
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',home);

app.listen(port,()=>{
  console.log (`[OK] server started on port  ${port}`);
})