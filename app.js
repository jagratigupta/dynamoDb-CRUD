var express = require('express');
const factory = require('./src/app/controllers/factoryController');
const site = require('./src/app/controllers/siteController');

const bodyParser=require("body-parser"); 
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger/swagger');
const app = express();
const http = require("http")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/site',site);

// var options = {
//     explorer: true
// };
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.sw, options));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
module.exports = app;
