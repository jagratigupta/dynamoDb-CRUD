var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
    try {
        var table = "machine";

        var params = {
            TableName: table,
            Key: {
                "machine_id": req.body.machine_id,
            }
        };

        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                callback(err)
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data)
            }
        });
    } catch (error) {
        callback(error)
    }
}

///////////////////Insert an item into table///////////////////
function write(callback) {
    try {
        console.log("Importing machines data into DynamoDB. Please wait.");
    var created_at = updated_at =Date.now()
    var allMachines = JSON.parse(req.body);
    console.log(allMachines)
    allMachines.forEach(function (machine) {
        var params = {
            TableName: "Machines",
            Item: {
                "machine_id": machine.EquipmentType,
                "parameters": machine.parameters,
                 "created_at" : created_at,
                 "updated_at" : updated_at
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put machine data",JSON.stringify(err, null, 2));
                return callback(err)
            } else {
                console.log("PutItem succeeded:", machine1.SourceIdentifierKey);
                return callback(null,data)
            }
        });
    });
    } catch (error) {
        callback(error)
    }
    
}

///////////////scan items////////////////////
function scan(callback) {
    try {
        var params = {
            TableName: "machine",
            ProjectionExpression: "#id, parameters",
            //FilterExpression: "#yr between :start_yr and :end_yr",
            ExpressionAttributeNames: {
                "#id": "machine_id"
            },
            /* ExpressionAttributeValues: {
                  ":start_yr": 1950,
                  ":end_yr": 1959 
             } */
        };
    
        console.log("Scanning Machines table.");
        docClient.scan(params, onScan);
    
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                return callback(err);
            } else {
                // print all the machines data
                console.log("Scan succeeded.");
                data.Items.forEach(function (machine) {
                    console.log(machine.machine_id + ": ", machine.parameters);
                });
    
                // continue scanning if we have more machines, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
                return callback(null,data)
            }
        }
    } catch (error) {
        callback(error)
    }
    
}

/////////////////////////delete item///////////////////////////
function del(req,callback) {
    try {
        var table ='machine'

        var params = {
            TableName: table,
            Key: {
                "machine_id": req.body.machine_id,
            },
            // ConditionExpression: "KPI[0].Dur > :val",
            // ExpressionAttributeValues: {
            //     ":val": 50
            // }
        };

        //console.log("Attempting a conditional delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                return callback(err)
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                return callback(null,data)
            }
        });

    } catch (error) {
        return callback(error)
    }

}


module.exports = {
  read : read,  
  write : write,
  scan : scan,
  del : del
}



//docClient.scan