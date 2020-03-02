var logger = require("../utilities/logger");
// var logger = winston.logger;
let resCodes = {
    badRequest: { code: 400, message: "There are some un-acceptable params in your request" },
    notFound: { code: 404, message: "Resources not found" },
    error: { code: 500, message: "Internal server error" },
    GET: { code: 200, message: "Success" },
    POST: { code: 201, message: "Successfully submitted" },
    PUT: { code: 204, message: "Successfully updated" },
    PATCH: { code: 204, message: "Successfully updated" },
    DELETE: { code: 202, message: "Successfully deleted" }
}

function errRes(err) {
    // logger.error(err);
    logger.apm?logger.apm.captureError(err):"";
    console.log(err);
    return {"message": err};
}

function successRes(res){
    
        return {
            "message": (res && res[0] && res[2].length > 0?"Success":"Record not found."),
            "data": (res && res[2]?res[2]:[]),
            "filteredRecords": (res && res[0] && res[0][0]?res[0][0]['fcnt']:0),
            "totalRecords": (res && res[1] && res[1][0]?res[1][0]['cnt']:0)
        }    
   
}

function successObjRes(res){
    
        if(res && res.operation && res.operation == 'softDelete'){
            return {
                "message": resCodes['DELETE'].message
            } 
        }
        // else if(res.code = 203){
        //     return{
        //         "message": resCodes['PUT'].message
        //     }
    
        // }
        else{
            return {
                "message": res[0]?"Success":(res['message']?res['message'] = res['message']:"Record not found."),
                "data": res[0]?res[0]:{}
            }  
        }   
   
}


   
module.exports = {
    resCodes: resCodes,
    successObjRes: successObjRes,
    successRes: successRes,
    errRes: errRes
}