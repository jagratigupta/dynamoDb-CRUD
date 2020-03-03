var tp = require('../../config/nodemailer');
const AWS = require("aws-sdk");

function send(options={from: "", to: "", subject: "", text: "", html: ""}, html=false){    
    if(html){ delete options.text; }else{ delete options.html; }
    tp.sendMail(options, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendSesEmail(options, callback){
    if(!options.to){options.to = 'email';}
    if(!options.from){options.from = "email";}

    AWS.config.update({
        accessKeyId: 'xxx',
        secretAccessKey: 'xxx',
        region: 'xxx'
    });    
    console.log(options);
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    let params = {
        Destination: {
            ToAddresses: [options.to],
            CcAddresses:["xxx","xxx"]
            // Email address/addresses that you want to send your email
        },
        ConfigurationSetName: 'panasonicemailconfig',
        Message: {
            Body: {},
            Subject: {
                Charset: "UTF-8",
                Data: options.subject
            }

        },
        Source: options.from
    };
    
    if(options.html){ 
        params.Message.Body['Html'] = {
            Charset: "UTF-8",
            Data: options.data
        };     
    }else{ 
        params.Message.Body['Text'] = {
            Charset: "UTF-8",
            Data: options.data
        }; 
    }
    
    ses.sendEmail(params, function(err, response){
        if(err){
            callback(null, err);
        }
        callback(null, response);
    });
}

module.exports = {
    sendEmail: send,
    sendSesEmail: sendSesEmail
};