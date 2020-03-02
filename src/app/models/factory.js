var AWS = require('aws-sdk');
var config = require('../../../config.json');
var fs = require('fs');
AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(callback){
    try {
        var table = "factory";
        var params = {
            TableName: table,
            Key: {
                "factory_id": "truring",
                "location": 'ggn'
            }
        };

        docClient.get(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                callback(error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data)
            }
        });
    } catch (error) {
        callback(error)
    }
}

module.exports = {
read : read
}