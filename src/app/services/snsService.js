const AWS = require("aws-sdk");

function sendSms(options, callback){
    // if(!options.to){options.to = '+919901688000';}
    // console.log('ABCD',options);
    AWS.config.update({
        accessKeyId: 'xxx',
        secretAccessKey: 'xxx',
        region: 'xxx'
    });
    console.log('PHONE NO',options);
    const sns = new AWS.SNS();

    const params = {
        Message: options.message,
        MessageStructure: 'string',
        PhoneNumber:  '+91'+options.to.substr(options.to.length - 10)
    };
    const param = {};
    sns.listTopics(param, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log("New---------------",data);           // successful response
    });
    console.log("Paramas-----------",JSON.stringify(params));
      
    if(params.PhoneNumber.length > 9){
        sns.publish(params, function(err, response){
            if(err){
                callback(null, err);
            }else{
                try {
                    console.log('step-9',params);
                    console.log('step-9a',response);
                    callback(null, response);
                } catch (error) {
                    callback(error);
                }
            }
        });
    }
}

module.exports = {
    sendSms: sendSms
};



