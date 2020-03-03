var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);


var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
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
                return callback(error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                return callback(null,data)
            }
        });
    } catch (error) {
        return callback(error)
    }
}

function write(req,callback) {
    try {
        console.log("Importing factory data into DynamoDB. Please wait.");
        var created_at = Date.now();
        var params = {
            TableName: "factory",
            Item: {
                "factory_id": req.factory_id,
                "location": req.location,
                "created_at": created_at
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put factory data",". Error JSON:", JSON.stringify(err, null, 2));
                return callback(new error("Unable to put machine data",". Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("PutItem succeeded",data);
                return callback(null,data)
            }
        });
    } catch (error) {
        callback(error)
    }
    
}


module.exports = {
  read : read,  
  write : write,
}
