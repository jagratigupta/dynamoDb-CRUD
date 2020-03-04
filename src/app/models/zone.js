var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);


var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
    try {
        var table = "zone"
        var params = {
            TableName: table,
            Key: {
                "zone_id": req.body.zone_id
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
        console.log("Importing zone data into DynamoDB. Please wait.");
        var created_at =updated_at= Date.now();
        var params = {
            TableName: "zone",
            Item: {
                "zone_id": req.body.zone_id,
                "site_id":req.body.site_id,
                "updated_at":updated_at,
                "created_at": created_at
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put zone data",". Error JSON:", JSON.stringify(err, null, 2));
                return callback(err)
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
        var table = "zone";
        var updated_at = Date.now()
        var params = {
            TableName:table,
            Key: {
                "zone_id": req.body.zone_id
            },
            UpdateExpression: "SET updated_at = :time",
            ExpressionAttributeValues: { 
                ":time": updated_at
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                callback(err)
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data)
            }
        });
    } catch (error) {
        return callback(error)
    }
}


/////////////////////////delete item///////////////////////////
function del(req,callback) {
    try {
        var table ='zone'

        var params = {
            TableName: table,
            Key: {
                "zone_id": req.body.zone_id
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
                callback(err)
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data)
            }
        });

    } catch (error) {
        callback(error)
    }

}


module.exports = {
  read,  
  write,
  del,
  update
}
