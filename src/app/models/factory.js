var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);


var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
    try {
        var table = "factory"
        var params = {
            TableName: table,
            Key: {
                "factory_id": "truminds",
                "location": 'hydra'
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

////////////scan all items in table////////////////
function scan(callback) {
    try {
        var params = {
            TableName: "factory",
            ProjectionExpression: "#id, location",
            //FilterExpression: "#yr between :start_yr and :end_yr",
            ExpressionAttributeNames: {
                "#id": "factory_id"
            },
            /* ExpressionAttributeValues: {
                  ":start_yr": 1950,
                  ":end_yr": 1959 
             } */
        };
    
        console.log("Scanning factory table.");
        docClient.scan(params, onScan);
    
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                return callback(err);
            } else {
                // print all the machines data
                console.log("Scan succeeded.");
                data.Items.forEach(function (factory) {
                    console.log(factory.factory_id + ": ", "Key", factory.location);
                });
    
                // continue scanning if we have more machines, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
                callback(null,data)
            }
        }
    } catch (error) {
        callback(error)
    }
    
}



function write(req,callback) {
    try {
        console.log("Importing factory data into DynamoDB. Please wait.");
        var created_at = updated_at = Date.now();
        console.log("timeStamp",created_at);
        var params = {
            TableName: "factory",
            Item: {
                "factory_id": req.body.factory_id,
                "location": req.body.location,
                "created_at": created_at,
                "updated_at" : updated_at
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
        return callback(error)
    }
    
}

function update(req,callback){
    try {
        var table = "factory";
        var updated_at = Date.now()
        var params = {
            TableName:table,
            Key:{
                "factory_id": "truminds",
                "location": 'hydra'
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
function del(obj,callback) {
    try {
        var table ='factory'

        var params = {
            TableName: table,
            Key: {
                "factory_id": req.body.factory_id,
                "location": req.body.location
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
<<<<<<< HEAD
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                callback(data)
=======
                if(Object.keys(data).length>1)
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                else console.log("no item")
>>>>>>> 76a0205dbeebf09d8870b2a37454c855dbd82819
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
  update,
  scan
}
