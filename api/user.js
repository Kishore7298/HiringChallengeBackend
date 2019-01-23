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

router.post('/signin',(req, res, next)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, (err, db)=>{
        if(err){
            res.status(404).json({
                error: err.message
            })
        }
        const database = db.db("switchon");
        database.collection("authentication").findOne({email:req.body.email}, (errr, result)=>{
            if(errr){
               return res.status(404).json({
                    error: errr.message,
                    status:0
                });
            }
            if(result.length < 1){
                return res.status(404).json({
                    error: "Authentication Failed!",
                    status:0
                });
            }
            bcrypt.compare(req.body.password, result.password, (eror, boole)=>{
                if(eror){
                    return res.status(404).json({
                        error: "Authentication Failed!",
                        status:0
                    });
                }
                if(boole){
                    return res.status(200).json({
                        message:"Authentication Succesful!!"
                        status:1
                    })
                }
                return res.status(404).json({
                    error: "Authentication Failed!",
                    status:0
                })

            })
        })

    })
});
module.exports = router;
