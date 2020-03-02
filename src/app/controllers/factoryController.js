var express = require('express');
var router = express.Router();

const factory = require('../models/factory')

router.get('/',(req,res,next) => {
    console.log("step-1",req.query);
    factory.read(req,(err,result) =>{
        if(err){
            //res.status(rs.resCodes.error.code).json(rs.errRes(err));
            res.send(err);
        }
        else{
            // res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
            res.status(200).json(result);
        }
    })
})


module.exports = router;