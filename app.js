var express = require('express');
const factory = require('./src/app/controllers/factoryController');
const bodyParser=require("body-parser"); 
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger/swagger');
const app = express();
const http = require("http")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/factory',factory);

// var options = {
//     explorer: true
// };
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.sw, options));

module.exports = app;
