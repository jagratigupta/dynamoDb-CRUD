const apm = require('elastic-apm-node').start({ 
    serviceName: 'Smart Factory',
    secretToken: '',
    // serverUrl: 'http://172.31.4.249:8200'
    serverUrl: 'http://52.66.251.85:8200'
  })
  
  
  const winston = require("winston");
  const wLogger = winston.createLogger();
  
    var client = require('./connectElastic');
    var winston_elasticsearch = require('winston-elasticsearch');
  
    function logger(collection="mtp_application_logs") {
      wLogger.add(new winston.transports.Console());
     
      try {
        return wLogger.add( new winston_elasticsearch({
          client,
          index: collection
        }));
      } catch (error) {
        apm?apm.captureError(error):"";
        // console.log(error)
        return wLogger.add(error);
      }
    }
    
  module.exports = {
    apm: apm,
    logger: logger
  
  }