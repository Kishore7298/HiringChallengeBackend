const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
const coordinateRoute = require('./api/coordinates');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/coordinates',coordinateRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.status( err.status || 500 ).json({
        message: err.message
    })
});

module.exports = app;

