const express= require('express');
const app= express();
const conn = require('./config');
const port = process.env.PORT || '3000'
const home = require('./routes/home')

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use('/',home);
conn.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("database connected");
    }
});


app.use('/',home);

app.listen(port,()=>{
  console.log (`[OK] server started on port  ${port}`);
})