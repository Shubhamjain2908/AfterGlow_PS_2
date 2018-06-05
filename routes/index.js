var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addData', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ag");

    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result.length);
      if (result.length > 30) {
        for (let index = 0; index < 5; index++) {
          var myquery = { _id: result[index]._id };
          dbo.collection("customers").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("Records deleted");
          });
        }
      }

      // save
      var myobj = { _id: result.slice(-1)[0]._id + 1 , value: req.body.value };
      dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Record inserted");
      });
      db.close();
    });
  });

  res.json({
    "Message":"Success"
  });

})
module.exports = router;
