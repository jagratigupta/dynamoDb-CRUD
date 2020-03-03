var AWS = require('aws-sdk');
var config = require('../../../config.json');
var fs = require('fs');
AWS.config.update(config.dynamoDb);

var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(callback){
    try {
        var table = "Machines";

        var params = {
            TableName: table,
            Key: {
                "EquipmentType": 2,
                "SourceIdentifierKey": 'deviceSerial'
            }
        };

        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                callback(error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
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

    var allMachines = JSON.parse(fs.readFileSync('./machine.json', 'utf8'));
    console.log(allMachines)
    allMachines.forEach(function (machine1) {
        var params = {
            TableName: "Machines",
            Item: {
                "EquipmentType": machine1.EquipmentType,
                "SourceIdentifierKey": machine1.SourceIdentifierKey,
                "Version": machine1.Version,
                "Supplier": machine1.Supplier,
                "Name": machine1.Name,
                "KPI": machine1.KPI
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put machine data", machine1.SourceIdentifierKey, ". Error JSON:", JSON.stringify(err, null, 2));
                return callback(new error("Unable to put machine data", machine1.SourceIdentifierKey, ". Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                console.log("PutItem succeeded:", machine1.SourceIdentifierKey);
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
            TableName: "Machines",
            ProjectionExpression: "#type, SourceIdentifierKey",
            //FilterExpression: "#yr between :start_yr and :end_yr",
            ExpressionAttributeNames: {
                "#type": "EquipmentType"
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
                return callback(new error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2)));
            } else {
                // print all the machines data
                console.log("Scan succeeded.");
                data.Items.forEach(function (machine) {
                    console.log(machine.EquipmentType + ": ", "Key", machine.SourceIdentifierKey);
                });
    
                // continue scanning if we have more machines, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
            }
        }
    } catch (error) {
        callback(error)
    }
    
}

/////////////////////////delete item///////////////////////////
function del(obj,callback) {
    try {
        var table ='Machines'

        var params = {
            TableName: table,
            Key: {
                "EquipmentType": obj.EquipmentType,
                "SourceIdentifierKey": obj.SourceIdentifierKey
            },
            ConditionExpression: "KPI[0].Dur > :val",
            ExpressionAttributeValues: {
                ":val": 50
            }
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
  scan : scan,
  del : del
}