const logger = require('../../config/logger');
function _error(err, options={}) {
    console.log(err);
    logger.apm?logger.apm.captureError(err):"";            
    return err; 
}

module.exports = {
    _error: _error
}