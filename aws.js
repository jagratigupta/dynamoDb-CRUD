var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
AWS.config.apiVersions = {
  //dynamodb: '2011-12-05',
  //ec2: '2013-02-01',
  dynamodb: 'latest'
}
var db = new AWS.DynamoDB();
console.log("IN AWS.JS")
router.get('/table-list', function(req, res, next) {
    db.listTables(function(err, data) {
      console.log(data.TableNames);
    });

  res.send('AWS - See the console plz.');
});

module.exports = router;