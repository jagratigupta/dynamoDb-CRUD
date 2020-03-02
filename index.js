const crud = require('./src/app/models/factory')

crud.read(function(err) {
    if(err){
       console.log(err);
    }
});