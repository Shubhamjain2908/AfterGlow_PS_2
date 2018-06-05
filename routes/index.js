var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Adding data to the database
 */
router.post('/addData', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ag");
    
    // dbo.collection("customers").remove({}).then(data => console.log(data)).catch(e => console.log(e)); // deleting all elements

    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result.length);
      /**
       * if records are more than 30 then removing top 5 from it
       */
      if (result.length > 30) {
        for (let index = 0; index < 5; index++) {
          var myquery = { _id: result[index]._id };
          dbo.collection("customers").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("Records deleted with id: " + result[index]._id);
          });
        }
      }

      // save
      /**
       * Check for an empty table  
       */
      if (result.slice(-1)[0] !== undefined) {
        var myobj = { _id: result.slice(-1)[0]._id + 1 , value: req.body.value };   // Last id + 1  
      } else {
        var myobj = { _id: 1 , value: req.body.value };   // Last id + 1
      }
      /**
       * Saving the current data 
       */
      dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Record inserted");
      });
      db.close();
      res.json({
        "Message":result
      });
    });
  });

});

/**
 * Fetching data from database
 */
router.get('/fetchData', function (req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ag");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json({
        "Result": result.slice(Math.max(result.length - 5, 1))
      });
    });
  });
});  

module.exports = router;
