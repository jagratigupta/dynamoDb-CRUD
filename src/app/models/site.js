var AWS = require('aws-sdk');
var config = require('../../config/config.json');
var fs = require('fs');
AWS.config.update(config);


var docClient = new AWS.DynamoDB.DocumentClient();

/////////////////////Read an Item///////////////////////
function read(req,callback){
    try {
        var table = "site"
        var params = {
            TableName: table,
            Key: {
                "site_id": "cyberhub",
                 "factory_id": "truring"
            }
        };

//docClient.scan it reads all data from file 
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
        console.log("Importing site data into DynamoDB. Please wait.");
        var created_at = Date.now();
        console.log("timeStamp",created_at);
        var params = {
            TableName: "site",
            Item: {
                "site_id": req.body.site_id,
                "factory_id": req.body.factory_id,
                "location":req.body.location,
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
//Update

function update(req,callback){
    try {
        var table = "site";
        var p=req.body;
        console.log(p)
        var params = {
            TableName:table,
            Key:{
                "site_id": req.body.site_id,
                "factory_id": req.body.factory_id,
            },
            Item: {
                "col":p.location
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
        var table ='site1'

        console.log("fcdgfwcdwd"+req.body.site_id)
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
                callback(err)
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
