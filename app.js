var express = require('express');
const app = express();
var aws_router = require('./aws');
app.use('/aws', aws_router);
console.log('IN APP.JS')
//npm install aws-sdk
//visit http://localhost:3000/aws/table-list