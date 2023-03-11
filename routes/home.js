const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');
// const conn = require('../config')
const multer = require('multer');
const path = require('path')
// multer 
// console.log(__dirname);

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
    console.log(req.file.path)
});

module.exports = router;