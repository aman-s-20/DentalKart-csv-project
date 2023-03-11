const express = require("express");
const router = express.Router();
const conn = require('../config');

router.get("/",(req,res)=> conn.query("SELECT * FROM dentalkart.user",(error,result)=>{
    if(error){
        res.send(error);
    }
    else{
        res.send(result);
    }
}));


module.exports = router;