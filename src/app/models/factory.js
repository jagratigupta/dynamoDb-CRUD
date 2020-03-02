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

///////////////////Insert an item into table///////////////////




function write(req,callback) {
    try {
        console.log("Importing factory data into DynamoDB. Please wait.");
    // var allMachines = JSON.parse(fs.readFileSync('../../../sample.json', 'utf8'));
    // var allMachines = req.body[0].KPI;
    // console.log(allMachines)
    // allMachines.forEach(function (machine1) {

        var table = "factory";

        var factory_id = "lunix";
        var location = "Delhi";
        
        var params = {
            TableName: table,
            Item:{
                "factory_id": factory_id,
                "location": location,
              
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return callback(error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

                return callback(null,data)
            }
        });
    // });
    } catch (error) {
        callback(error)
    }
    
}

module.exports = {
read : read,
write:write
}