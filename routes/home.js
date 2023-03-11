const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');
const conn = require('../config')
const multer = require('multer');
const path = require('path')
const csv = require('fast-csv')
const fs = require('fs')
const mysql = require('mysql2')
const data_exporter = require('json2csv').Parser;

// multer 
// console.log(__dirname);
require('dotenv').config();
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "dentalkart"
})
const db = mysql.createConnection({
    host : process.env.host,
    user :  process.env.user,
    password :  process.env.password,
    database :  process.env.database,
  });
// require('../uploads')

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './routes/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})
let upload = multer({
    storage: storage
})
function uploadCsv(uriFile) {
    let stream = fs.createReadStream(uriFile);
    let csvDataColl = [];
    let fileStream = csv
        .parse()
        .on('data', function (data) {
            csvDataColl.push(data);
        })
        .on('end', function () {
            csvDataColl.shift()
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let query = "INSERT IGNORE INTO user(Name,Roll_No,Address,Institute,Course,Email) VALUES ?";
                    connection.query(query, [csvDataColl], (error, res) => {
                        console.log(error || res);
                    });
                }
            });
            fs.unlinkSync(uriFile)
        });
    stream.pipe(fileStream)
}

router.get("/", studentController.getAllDetail);
router.post("/", upload.single('file'), (req, res) => {
    console.log(req.file.filename);
    uploadCsv(__dirname + '/uploads/' + req.file.filename)
    res.send('data imported');
});
router.get("/download", (req,res)=>{
    const q = "SELECT * FROM user";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      // console.log(data);
      var sql_data=JSON.parse(JSON.stringify(data));
    //   console.log(sql_data);
      // console.log(data[0].name);
    //   return res.json(data);
  

      var file_header = ['Name', 'Roll_no', 'Address','Institute','Course','Email'];

      var json_data = new data_exporter({file_header});

      var csv_data = json_data.parse(sql_data);
    //   console.log(csv_data);

      res.setHeader("Content-Type", "text/csv");

      res.setHeader("Content-Disposition", "attachment; filename=sample_data.csv");

      res.status(200).send(csv_data);

    });
}
);

module.exports = router;