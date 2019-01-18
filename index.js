const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://kishore:abcd1234@ds261114.mlab.com:61114/switchon";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Please visit '/details' endpoint route to see the entered details, '/post' route to post data");
});

app.get('/details',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) console.log(err);
        const dbo = db.db("SwitchOn");
        dbo.collection("Part History").find().toArray((err, result)=> {
          if (err) console.log(err);
          res.send(result);
          db.close();
        });
      });
})

app.listen(process.env.PORT || 5000);
console.log("App is running on port 5000");