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
<<<<<<< HEAD
            res.send(JSON.stringify(result, null, 2))
            //res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
=======
            // res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
            res.status(200).json(result);
>>>>>>> 272c304c5ecbdf5cc09d6b2d402af5b860d836fc
        }
    })
})


module.exports = router;