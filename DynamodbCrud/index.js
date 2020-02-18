const crud = require('./crud.js')

crud.read(function(err) {
    if(err){
       console.log(err);
    }
});

/*
crud.write(function(err) {
    if(err){
       console.log(err);
    }
});
crud.scan(function(err) {
    if(err){
       console.log(err);
    }
});
var obj = {
    "EquipmentType": 2,
    "SourceIdentifierKey": "deviceSerial"
}
crud.del(obj,function(err) {
    if(err){
       console.log(err);
    }
}); */
