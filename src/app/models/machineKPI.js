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
                "machine_id":"Mcahine_id",
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
        //console.log("timeStamp",created_at);
        var params = {
            TableName: "machineKPI",
            Item: {
                "machine_id": req.body.machine_id,
               "time": req.body.time,
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to put machineKPI data",". Error JSON:", JSON.stringify(err, null, 2));
                return callback(new error("Unable to put MachineKPI data",". Error JSON:", JSON.stringify(err, null, 2)))
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
        var table = "machineKPI";
        var params = {
            TableName:table,
            Key:{
                "machine_id":"mcahine_id",
                "time" :"time"
            },
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
        var table ='machineKPI'
        var params = {
            TableName: table,
            Key: {
                "machine_id": req.body.machine_id,
                "time": req.body.time
            },
        };

        console.log("Attempting a conditional delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                callback(error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2)))
            } else {
                if(Object.keys(data).length>1)
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                else console.log("no item")
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
  update:update
}
