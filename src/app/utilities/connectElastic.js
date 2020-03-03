var elasticsearch = require('elasticsearch');
var elasticClient  = new elasticsearch.Client({
    host: '13.235.139.58:9200'
})

module.exports = elasticClient;