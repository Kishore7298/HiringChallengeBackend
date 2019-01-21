const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://kishore:abcd1234@ds161724.mlab.com:61724/switchon";

router.get('/',(req, res, next)=>{
    MongoClient.connect(url,(err, db)=>{
        if(err){
            throw err;
        }
        const database = db.db("switchon");
        database.collection("PartHistory").find().toArray((err, resu)=>{
            if(err) throw err;
            res.status(200).json(resu);
            db.close();
        })
    });
});

router.post('/',(req, res, next)=>{
    const coordinates = {
        numberOfParts:req.body.numberOfParts,
        time:req.body.time
    }
    MongoClient.connect(url,(err, db)=>{
        if(err){
            throw err;
        }
        const database = db.db("switchon");
        database.collection("PartHistory").insertOne(coordinates,{ useNewUrlParser: true},(err,result)=>{
            if(err) throw err;
            res.status(201).json({
                message:"Updated Succesfully!!",
                result:result,
            });
        });
    });
});
module.exports = router;