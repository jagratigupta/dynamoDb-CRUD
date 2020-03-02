var express = require('express');
var router = express.Router();

const factory = require('../models/factory')

router.get('/read',(req,res,next) => {
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