var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: "AKIARISLY47F3R3VGJUC", 
    secretAccessKey: "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",
  region: "ap-south-1"
//   endpoint: "http://localhost:8000"
});

console.log("abcd");
var dynamodb = new AWS.DynamoDB();


function createNewTable (req,callback){ 


var params = {
    TableName : "Movies123",
    // BillingMode: "PAY_PER_REQUEST",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

}


createNewTable();


module.exports = {
    createNewTable:createNewTable
}