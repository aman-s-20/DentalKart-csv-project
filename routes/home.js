const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');
const conn = require('../config')
const multer = require('multer');
const path = require('path')
const csv = require('fast-csv')
const fs = require('fs') 
const mysql = require('mysql2')
// multer 
// console.log(__dirname);
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "",
    database : "dentalkart"
})


let storage= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, './uploads/');
    },
    filename:(req,file,callback)=>{
       callback(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
  })
  let upload = multer({
    storage: storage
  })

router.get("/",studentController.getAllDetail);
router.post("/",upload.single('file'),(req,res) =>{
    console.log(req.file.filename);
    uploadCsv( './uploads/' + req.file.filename)
    res.send('data imported');
});

function uploadCsv(uriFile){
    let stream = fs.createReadStream(uriFile);
    let csvDataColl = [];
    let fileStream = csv
    .parse()
    .on('data',function(data){
        csvDataColl.push(data);
    })
    .on('end',function(){
         csvDataColl.shift()
         pool.getConnection((err,connection)=>{
            if(err){
                console.log(err);
            }
            else{
                let query = "INSERT IGNORE INTO user(Name,Roll_No,Address,Institute,Course,Email) VALUES ?";
                connection.query(query,[csvDataColl],(error,res)=>{
                    console.log(error || res);
                });
            }
         });
        fs.unlinkSync(uriFile)
    });
   stream.pipe(fileStream)
}
module.exports = router;