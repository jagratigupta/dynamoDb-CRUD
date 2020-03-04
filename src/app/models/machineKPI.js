var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);


var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
    try {
        var table = "machineKPI"
        var params = {
            TableName: table,
            Key: {
                "machine_ID":"Mcahine_ID",
                "time" :"time"
            }
        };

        docClient.get(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
                return callback(err)
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
                return callback(null,data)
            }
        });
    } catch (error) {
        return callback(error)
    }
}

function write(req,callback) {
    try {
        console.log("Importing MachineKPI data into DynamoDB. Please wait.");
        var created_at = Date.now();
        console.log("timeStamp",created_at);
        var params = {
            TableName: "site",
            Item: {
                "machine_ID": req.body.machine_ID,
               "time": req.body.time,
                "KPI1":req.body.location,
                "updated_at":req.body.updated_at,
                "created_at": created_at,
                "address":req.body.address
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put site data",". Error JSON:", JSON.stringify(err, null, 2));
                return callback(new error("Unable to put site data",". Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("PutItem succeeded",data);
                return callback(null,data)
            }
        });
    } catch (error) {
        return callback(error)
    }
    
}


function update(req,callback){
    try {
        var table = "site";
        var params = {
            TableName:table,
            Key:{
                "site_id": site_id,
                "factory_id": factory_id
            },
            // UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
            // ExpressionAttributeValues:{
            //     ":r":5.5,
            //     ":p":"Everything happens all at once.",
            //     ":a":["Larry", "Moe", "Curly"]
            // },
            ReturnValues:"UPDATED_NEW"
        };
        
        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    } catch (error) {
        return callback(error)
    }
}


/////////////////////////delete item///////////////////////////
function del(obj,callback) {
    try {
        var table ='site'

        var params = {
            TableName: table,
            Key: {
                "site_id": req.body.site_id,
                "factory_id": req.body.factory_id
            },
           // ConditionExpression: "",
            // ExpressionAttributeValues: {
            //     ":val": 50
            // }
        };

        console.log("Attempting a conditional delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                callback(error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            }
        });

    } catch (error) {
        callback(error)
    }

}


module.exports = {
  read : read,  
  write : write,
  del : del,
  upadte:update
}