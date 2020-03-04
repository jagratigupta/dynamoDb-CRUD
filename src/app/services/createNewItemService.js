var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: "AKIARISLY47F3R3VGJUC", 
    secretAccessKey: "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",
  region: "ap-south-1"
//   endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies123";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});