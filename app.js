const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const coordinateRoute = require('./api/coordinates');
const userRoute = require('./api/user');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/coordinates',coordinateRoute);
app.use('/user',userRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Founded');
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.status( err.status || 500 ).json({
        message: err.message
    })
});

module.exports = app;
