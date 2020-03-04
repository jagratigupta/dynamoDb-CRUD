var express = require('express');
var router = express.Router();
var rs = require('../utilities/responseStructure');

const machine = require('../models/machine')


//get api controller of machine
router.get('/read',(req,res,next) => {
    console.log("step-1",req.query);
    machine.read(req,(err,result) =>{
        if(err){
            //res.status(rs.resCodes.error.code).json(rs.errRes(err));
            res.status(500).send(err)
        }
        else{
            console.log(result);
            //res.status(rs.resCodes[req.method].code).json(rs.successRes(result));
            res.status(200).send(JSON.stringify(result))
        }
    })
})

router.get('/scan',(req,res,next) => {
    console.log("step-1",req.query);
    machine.scan(req,(err,result) =>{
        if(err){
            //res.status(rs.resCodes.error.code).json(rs.errRes(err));
            res.status(500).send(err)
        }
        else{
            console.log(result);
            //res.status(rs.resCodes[req.method].code).json(rs.successRes(result));
            res.status(200).send(JSON.stringify(result))
        }
    })
})

router.post('/write',(req,res,next) => {
    machine.write(req,(err,result) =>{
        if(err){
            //res.status(rs.resCodes.error.code).json(rs.errRes(err));
            res.status(500).send(err)
        }
        else{
            //res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
            res.status(201).send(JSON.stringify(result))
        }
    })
})

// router.put('/update',(req,res,next) => {
//     machine.update(req,(err,result) =>{
//         if(err){
//             //res.status(rs.resCodes.error.code).json(rs.errRes(err));
//             res.status(500).send(err)
//         }
//         else{
//             //res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
//             res.status(201).send(JSON.stringify(result))
//         }
//     })
// })

router.delete('/delete',(req,res,next) => {
    machine.del(req,(err,result) =>{
        if(err){
            //res.status(rs.resCodes.error.code).json(rs.errRes(err));
            res.status(500).send(err)
        }
        else{
            //res.status(rs.resCodes[req.method].code).json(rs.successObjRes(result));
            res.status(201).send(JSON.stringify(result))
        }
    })
})

module.exports = router;