const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = "mongodb://kishore:abcd1234@ds161724.mlab.com:61724/switchon";

router.post('/signup',(req, res, next)=>{
bcrypt.hash(req.body.password, 10 ,(err, hash)=>{
        if(err){
            res.status(500).json({
                error: err
            })
        } else {
            const user = {
                email:req.body.email,
                password:hash
            }
            MongoClient.connect(url, (err, db)=>{
               if(err) throw err;
               const database =  db.db("switchon");
               database.collection('authentication').insertOne(user,{ useNewUrlParser: true}, (errr, result)=>{
                   if(errr) throw errr
                   res.status(201).json({
                       message:"Write Succesful",
                       result:result
                   });
               });
            });
        }
    });
});

module.exports = router;
